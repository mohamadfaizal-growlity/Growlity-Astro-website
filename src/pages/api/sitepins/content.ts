export const prerender = false;

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function getContentDir(collection: string): string {
  const schemaDir = path.join(process.cwd(), '.sitepins', 'schema');
  if (fs.existsSync(schemaDir)) {
    const files = fs.readdirSync(schemaDir).filter(f => f.endsWith('.json'));
    for (const f of files) {
      try {
        const content = fs.readFileSync(path.join(schemaDir, f), 'utf-8');
        const schema = JSON.parse(content);
        if (schema.name === collection && schema.file) {
          return path.join(process.cwd(), path.dirname(schema.file));
        }
      } catch (e) {}
    }
  }
  return path.join(process.cwd(), 'src', 'content', collection);
}

export async function GET({ request }: { request: Request }) {
  try {
    const url = new URL(request.url);
    const collection = url.searchParams.get('collection'); // e.g., 'pages', 'blog'
    
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
      const { data } = matter(fileContent);
      return {
        slug: file.replace(/\\/g, '/').replace(/\.mdx?$/, ''),
        file,
        data,
      };
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
    const fileDir = path.dirname(filePath);
    
    if (!fs.existsSync(fileDir)) {
      fs.mkdirSync(fileDir, { recursive: true });
    }

    const fileContent = matter.stringify(content || '', data || {});
    
    fs.writeFileSync(filePath, fileContent, 'utf-8');

    return new Response(JSON.stringify({ success: true, slug }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
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
    const mdxPath = path.join(contentDir, `${slug}.mdx`);
    const mdPath = path.join(contentDir, `${slug}.md`);
    
    if (fs.existsSync(mdxPath)) {
      fs.unlinkSync(mdxPath);
    } else if (fs.existsSync(mdPath)) {
      fs.unlinkSync(mdPath);
    }

    return new Response(JSON.stringify({ success: true }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}
