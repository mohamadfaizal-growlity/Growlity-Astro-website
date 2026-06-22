import fs from 'fs';
import path from 'path';
import TurndownService from 'turndown';
import dotenv from 'dotenv';

dotenv.config();

const WP_URL = process.env.WP_URL;
const WP_USERNAME = process.env.WP_USERNAME;
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD;

if (!WP_URL || !WP_USERNAME || !WP_APP_PASSWORD) {
  console.error("Missing credentials in .env file! Please fill WP_URL, WP_USERNAME, and WP_APP_PASSWORD.");
  process.exit(1);
}

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

const collections = [
  { wpEndpoint: 'posts', astroFolder: 'src/content/blog' },
  { wpEndpoint: 'case-studies', astroFolder: 'src/content/caseStudies' },
  { wpEndpoint: 'services', astroFolder: 'src/content/services' }
];

async function fetchFromWP(endpoint, page = 1) {
  const url = `${WP_URL}/wp-json/wp/v2/${endpoint}?per_page=10&page=${page}&_embed=1`;
  const auth = Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64');
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Basic ${auth}`,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    if (response.status === 400 || response.status === 404) return []; // End of pagination or endpoint missing
    throw new Error(`WordPress API Error: ${response.statusText}`);
  }

  return response.json();
}

function sanitizeSlug(slug) {
  return slug.replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function extractRankMathSEO(post) {
  // RankMath usually exposes these in the meta fields or as a dedicated object
  const seo = {
    title: post.title?.rendered || '',
    description: '',
    keywords: ''
  };

  if (post.rank_math_title) seo.title = post.rank_math_title;
  if (post.rank_math_description) seo.description = post.rank_math_description;
  if (post.rank_math_focus_keyword) seo.keywords = post.rank_math_focus_keyword;
  
  // Fallback to general meta if rank_math_ directly isn't exposed
  if (post.meta) {
    if (post.meta.rank_math_title) seo.title = post.meta.rank_math_title;
    if (post.meta.rank_math_description) seo.description = post.meta.rank_math_description;
    if (post.meta.rank_math_focus_keyword) seo.keywords = post.meta.rank_math_focus_keyword;
  }

  return seo;
}

async function runMigration() {
  console.log("Starting WordPress Migration...\n");

  for (const collection of collections) {
    console.log(`Migrating: ${collection.wpEndpoint} -> ${collection.astroFolder}`);
    
    // Ensure destination directory exists
    const dirPath = path.join(process.cwd(), collection.astroFolder);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    let page = 1;
    let hasMore = true;

    while (hasMore) {
      console.log(`  Fetching page ${page}...`);
      try {
        const posts = await fetchFromWP(collection.wpEndpoint, page);
        
        if (posts.length === 0) {
          hasMore = false;
          break;
        }

        for (const post of posts) {
          const slug = sanitizeSlug(post.slug);
          const seo = extractRankMathSEO(post);
          const markdownContent = turndownService.turndown(post.content.rendered);
          
          let featuredImage = '';
          if (post._embedded && post._embedded['wp:featuredmedia']) {
            featuredImage = post._embedded['wp:featuredmedia'][0].source_url || '';
          }

          const frontmatter = `---
title: "${post.title.rendered.replace(/"/g, '\\"')}"
date: "${post.date}"
slug: "${slug}"
featuredImage: "${featuredImage}"
seoTitle: "${seo.title.replace(/"/g, '\\"')}"
seoDescription: "${seo.description.replace(/"/g, '\\"')}"
seoKeywords: "${seo.keywords.replace(/"/g, '\\"')}"
---

${markdownContent}
`;

          const filePath = path.join(dirPath, `${slug}.mdx`);
          fs.writeFileSync(filePath, frontmatter);
          console.log(`    Saved: ${slug}.mdx`);
        }

        page++;
      } catch (error) {
        console.error(`  Error fetching ${collection.wpEndpoint}: ${error.message}`);
        // If the endpoint simply doesn't exist (e.g. custom post type not exposed to REST API), skip it
        hasMore = false;
      }
    }
    console.log(`Finished migrating ${collection.wpEndpoint}\n`);
  }
  
  console.log("Migration Complete! 🎉");
}

runMigration().catch(console.error);
