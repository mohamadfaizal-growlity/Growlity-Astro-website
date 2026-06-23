export const prerender = false;

import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const schemaDir = path.join(process.cwd(), '.sitepins', 'schema');
    const hiddenSchemaDir = path.join(process.cwd(), '.sitepins', 'hidden-schema');
    
    let files: {file: string, dir: string}[] = [];
    if (fs.existsSync(schemaDir)) {
      files = files.concat(fs.readdirSync(schemaDir).filter(f => f.endsWith('.json')).map(f => ({file: f, dir: schemaDir})));
    }
    if (fs.existsSync(hiddenSchemaDir)) {
      files = files.concat(fs.readdirSync(hiddenSchemaDir).filter(f => f.endsWith('.json')).map(f => ({file: f, dir: hiddenSchemaDir})));
    }

    if (files.length === 0) {
      return new Response(JSON.stringify([]), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    const schemas = files.map(({file, dir}) => {
      const content = fs.readFileSync(path.join(dir, file), 'utf-8');
      const schema = JSON.parse(content);
      
      let baseDir = path.join(process.cwd(), 'src', 'content', schema.name);
      if (schema.file) {
         baseDir = path.join(process.cwd(), path.dirname(schema.file));
      }
      
      let groups: string[] = [];
      if (fs.existsSync(baseDir)) {
        groups = fs.readdirSync(baseDir).filter(f => {
          const stat = fs.statSync(path.join(baseDir, f));
          return stat.isDirectory();
        });
      }
      schema.groups = groups;
      
      return schema;
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
