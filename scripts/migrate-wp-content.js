import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
import TurndownService from 'turndown';

// Load .env
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const WP_URL = process.env.WP_URL;
const WP_USERNAME = process.env.WP_USERNAME;
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD;

if (!WP_URL || !WP_USERNAME || !WP_APP_PASSWORD) {
  console.error("Missing WP credentials in .env");
  process.exit(1);
}

const auth = Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64');
const turndownService = new TurndownService({ headingStyle: 'atx' });

async function fetchAllPosts(postType) {
  let allPosts = [];
  let page = 1;
  let totalPages = 1;

  do {
    console.log('Fetching page ' + page + ' of ' + postType + '...');
    const res = await fetch(WP_URL + '/wp-json/wp/v2/' + postType + '?_embed=true&per_page=10&page=' + page, {
      headers: { 'Authorization': `Basic ${auth}` }
    });

    if (!res.ok) {
      if (res.status === 404) {
        console.error('Post type "' + postType + '" not found or not exposed to REST API.');
        return allPosts;
      }
      throw new Error('Failed to fetch: ' + res.status + ' ' + res.statusText);
    }

    totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1', 10);
    const posts = await res.json();
    allPosts = allPosts.concat(posts);
    page++;
  } while (page <= totalPages);

  return allPosts;
}

function generateFrontmatter(post, postType) {
  const title = post.title?.rendered?.replace(/"/g, '\\"') || '';
  const dateStr = post.date || new Date().toISOString();
  const slug = post.slug || '';
  
  let featuredImage = '';
  if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0]) {
    featuredImage = post._embedded['wp:featuredmedia'][0].source_url || '';
  }

  let fm = "---\n";
  fm += 'title: "' + title + '"\n';
  fm += 'slug: "' + slug + '"\n';
  fm += 'featuredImage: "' + featuredImage + '"\n';
  
  if (postType === 'solution' || postType === 'services') {
    fm += 'category: "General"\n';
    fm += 'shortDescription: "' + title + ' - Learn more about our comprehensive services."\n';
  } else if (postType === 'case-studie' || postType === 'case-studies') {
    fm += 'clientName: "' + title + '"\n';
    fm += 'industry: "Various"\n';
  } else if (postType === 'webinar-and-events' || postType === 'webinars') {
    fm += 'speaker: "Growlity Expert"\n';
    fm += 'date: ' + dateStr + '\n';
    fm += 'time: "10:00 AM"\n';
    fm += 'timezone: "EST"\n';
  } else if (postType === 'publication' || postType === 'publications') {
    fm += 'category: "Report"\n';
    fm += 'publishDate: ' + dateStr + '\n';
  } else {
    // Blogs / default
    fm += 'publishedDate: ' + dateStr + '\n';
    fm += 'author: "Growlity Team"\n';
    fm += 'category: "General"\n';
  }
  
  fm += 'seoTitle: "' + title + '"\n';
  fm += 'seoDescription: ""\n';
  fm += '---\n\n';
  return fm;
}

async function migrate(postType, destFolder) {
  console.log('Starting migration for: ' + postType + ' into ' + destFolder);
  const posts = await fetchAllPosts(postType);
  console.log('Found ' + posts.length + ' items.');

  const outputDir = path.join(__dirname, '..', 'src', 'content', destFolder);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const post of posts) {
    if (!post.slug) continue;
    
    const markdownContent = turndownService.turndown(post.content?.rendered || '');
    const frontmatter = generateFrontmatter(post, postType);
    const finalContent = frontmatter + markdownContent;
    
    const filePath = path.join(outputDir, post.slug + '.mdx');
    fs.writeFileSync(filePath, finalContent, 'utf-8');
    console.log('Saved: ' + post.slug + '.mdx');
  }
  console.log('Finished migrating ' + postType + '!');
}

const args = process.argv.slice(2);
if (args.length < 2) {
  console.log("Usage: node migrate-wp-content.js <wp_post_type> <dest_folder>");
  process.exit(1);
}

migrate(args[0], args[1]).catch(console.error);
