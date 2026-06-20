export const prerender = false;

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET({ request }: { request: Request }) {
  try {
    const url = new URL(request.url);
    const collection = url.searchParams.get('collection'); // e.g., 'pages', 'blog'
    
    if (!collection) {
      return new Response(JSON.stringify({ error: 'Collection is required' }), { status: 400 });
    }

    const contentDir = path.join(process.cwd(), 'src', 'content', collection);
    if (!fs.existsSync(contentDir)) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    const items = files.map(file => {
      const filePath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      return {
        slug: file.replace(/\.mdx?$/, ''),
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

    const contentDir = path.join(process.cwd(), 'src', 'content', collection);
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }

    const filePath = path.join(contentDir, `${slug}.mdx`);
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

    const contentDir = path.join(process.cwd(), 'src', 'content', collection);
    const filePath = path.join(contentDir, `${slug}.mdx`);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return new Response(JSON.stringify({ success: true }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { status: 500 });
  }
}
