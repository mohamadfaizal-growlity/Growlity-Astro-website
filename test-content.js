import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

function getContentDir(collection) {
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

const contentDir = getContentDir("Entries");
console.log("ContentDir:", contentDir);

const files = [];
function getFiles(dir, currentPath = '') {
  if (!fs.existsSync(dir)) return;
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
console.log("Files:", files);

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
console.log("Items:", items);
