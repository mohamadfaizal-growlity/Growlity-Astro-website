export const prerender = false;

import fs from 'fs';
import path from 'path';

const settingsFile = path.join(process.cwd(), 'src', 'data', 'settings.json');

function ensureDataDir() {
  const dataDir = path.dirname(settingsFile);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(settingsFile)) {
      return new Response(JSON.stringify({}), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    const content = fs.readFileSync(settingsFile, 'utf-8');
    return new Response(content, { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}

export async function POST({ request }: { request: Request }) {
  try {
    const data = await request.json();
    ensureDataDir();
    fs.writeFileSync(settingsFile, JSON.stringify(data, null, 2));

    return new Response(JSON.stringify({ success: true }), { 
      status: 200, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }
}
