export const prerender = false;

import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const schemaDir = path.join(process.cwd(), '.sitepins', 'schema');
    if (!fs.existsSync(schemaDir)) {
      return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    const files = fs.readdirSync(schemaDir).filter(f => f.endsWith('.json'));
    const schemas = files.map(file => {
      const content = fs.readFileSync(path.join(schemaDir, file), 'utf-8');
      return JSON.parse(content);
    });

    return new Response(JSON.stringify(schemas), { 
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
