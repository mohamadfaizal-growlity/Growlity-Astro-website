export const prerender = false;

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function getContentDir(collection: string): string {
  const checkDir = (dirPath: string) => {
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json'));
      for (const f of files) {
        try {
          const content = fs.readFileSync(path.join(dirPath, f), 'utf-8');
          const schema = JSON.parse(content);
          if (schema.name === collection && schema.file) {
            return path.join(process.cwd(), path.dirname(schema.file));
          }
        } catch (e) {}
      }
    }
    return null;
  };

  const schemaDir = path.join(process.cwd(), '.sitepins', 'schema');
  const foundInSchema = checkDir(schemaDir);
  if (foundInSchema) return foundInSchema;

  const hiddenSchemaDir = path.join(process.cwd(), '.sitepins', 'hidden-schema');
  const foundInHidden = checkDir(hiddenSchemaDir);
  if (foundInHidden) return foundInHidden;

  return path.join(process.cwd(), 'src', 'content', collection);
}

export async function GET({ request }: { request: Request }) {
  try {
    const url = new URL(request.url);
    const collection = url.searchParams.get('collection');
    
    if (!collection) {
      return new Response(JSON.stringify({ error: 'Collection is required' }), { status: 400 });
    }

    const contentDir = getContentDir(collection);
    if (!fs.existsSync(contentDir)) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const files: string[] = [];
    function getFiles(dir: string, currentPath: string = '') {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const relPath = currentPath ? `${currentPath}/${item}` : item;
        if (fs.statSync(fullPath).isDirectory()) {
          getFiles(fullPath, relPath);
        } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
          files.push(relPath);
        }
      }
    }
    getFiles(contentDir);

    const items = files.map(file => {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      return {
        slug: file.replace(/\\/g, '/').replace(/\.mdx?$/, ''),
        file,
        data,
        content,
      };
    });

    // Sort by date descending (newest first) like WordPress
    items.sort((a, b) => {
      const dateA = new Date(a.data?.publishedDate || a.data?.pubDate || a.data?.date || a.data?.created_at || 0).getTime();
      const dateB = new Date(b.data?.publishedDate || b.data?.pubDate || b.data?.date || b.data?.created_at || 0).getTime();
      
      // If both dates are invalid (0), sort alphabetically by title as fallback
      if (dateA === 0 && dateB === 0) {
         const titleA = (a.data?.title || a.slug || '').toLowerCase();
         const titleB = (b.data?.title || b.slug || '').toLowerCase();
         return titleA.localeCompare(titleB);
      }
      
      return dateB - dateA;
    });

    return new Response(JSON.stringify(items), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}

export async function POST({ request }: { request: Request }) {
  try {
    const body = await request.json();
    const { collection, slug, data, content } = body;

    if (!collection || !slug) {
      return new Response(JSON.stringify({ error: 'Collection and slug are required' }), { status: 400 });
    }

    const contentDir = getContentDir(collection);
    const filePath = path.join(contentDir, `${slug}.mdx`);
    const fileContent = matter.stringify(content || '', data || {});

    // GITHUB INTEGRATION
    const githubToken = process.env.GITHUB_TOKEN;
    const repoOwner = process.env.GITHUB_REPO_OWNER;
    const repoName = process.env.GITHUB_REPO_NAME;
    const branch = 'Admin_Panel'; 

    if (githubToken && repoOwner && repoName) {
      const relativeDir = path.relative(process.cwd(), contentDir).replace(/\\/g, '/');
      const githubPath = `${relativeDir}/${slug}.mdx`;
      const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${githubPath}?ref=${branch}`;

      // Get SHA first to overwrite existing files
      let sha = undefined;
      const getRes = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${githubToken}`, 'User-Agent': 'Growlity-CMS' }
      });
      if (getRes.ok) {
        const fileData = await getRes.json();
        sha = fileData.sha;
      }

      // PUT file to GitHub
      const encodedContent = Buffer.from(fileContent).toString('base64');
      const putRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${githubPath}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${githubToken}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Growlity-CMS'
        },
        body: JSON.stringify({
          message: `CMS Update: ${slug}`,
          content: encodedContent,
          branch: branch,
          ...(sha && { sha })
        })
      });

      if (!putRes.ok) {
        const errorText = await putRes.text();
        throw new Error(`GitHub API Error: ${errorText}`);
      }

      return new Response(JSON.stringify({ success: true, slug, github: true }), { 
        status: 200, headers: { 'Content-Type': 'application/json' } 
      });
    }

    // LOCAL FALLBACK
    const fileDir = path.dirname(filePath);
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }
    fs.writeFileSync(filePath, fileContent, 'utf-8');

    return new Response(JSON.stringify({ success: true, slug, local: true }), { 
      status: 200, headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}

export async function DELETE({ request }: { request: Request }) {
  try {
    const url = new URL(request.url);
    const collection = url.searchParams.get('collection');
    const slug = url.searchParams.get('slug');

    if (!collection || !slug) {
      return new Response(JSON.stringify({ error: 'Collection and slug are required' }), { status: 400 });
    }

    const contentDir = getContentDir(collection);
    const githubToken = process.env.GITHUB_TOKEN;
    const repoOwner = process.env.GITHUB_REPO_OWNER;
    const repoName = process.env.GITHUB_REPO_NAME;
    const branch = 'Admin_Panel';

    if (githubToken && repoOwner && repoName) {
      const relativeDir = path.relative(process.cwd(), contentDir).replace(/\\/g, '/');
      const githubPathMdx = `${relativeDir}/${slug}.mdx`;
      
      const getRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${githubPathMdx}?ref=${branch}`, {
        headers: { Authorization: `Bearer ${githubToken}`, 'User-Agent': 'Growlity-CMS' }
      });
      
      if (getRes.ok) {
        const fileData = await getRes.json();
        const deleteRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${githubPathMdx}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${githubToken}`,
            'Content-Type': 'application/json',
            'User-Agent': 'Growlity-CMS'
          },
          body: JSON.stringify({
            message: `CMS Delete: ${slug}`,
            branch: branch,
            sha: fileData.sha
          })
        });

        if (!deleteRes.ok) throw new Error('Failed to delete on GitHub');
        
        return new Response(JSON.stringify({ success: true, github: true }), { status: 200 });
      }
    }

    const mdxPath = path.join(contentDir, `${slug}.mdx`);
    const mdPath = path.join(contentDir, `${slug}.md`);
    if (fs.existsSync(mdxPath)) fs.unlinkSync(mdxPath);
    else if (fs.existsSync(mdPath)) fs.unlinkSync(mdPath);

    return new Response(JSON.stringify({ success: true, local: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}
