const fs = require('fs');
const path = require('path');

const dir = 'src/content/blog';
fs.readdirSync(dir).forEach(file => {
  if (!file.endsWith('.mdx')) return;
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf-8');
  
  // Find the first instance of '{"@context"' and slice the string right there
  const jsonIndex = content.indexOf('{"@context"');
  if (jsonIndex !== -1) {
    content = content.slice(0, jsonIndex);
  }

  // Same for any other stray JSON arrays if they somehow exist:
  const typeIndex = content.indexOf('},{"@type"');
  if (typeIndex !== -1) {
    content = content.slice(0, typeIndex);
  }

  // Clean CSS blocks completely too, they are just noise
  content = content.replace(/\/\* --- CTA Section Critical CSS --- \*\/[\s\S]*?\}/g, '');
  
  // Also any stray `},` or `]}` at the end
  content = content.replace(/\},\{"@type".*$/gs, '');
  content = content.replace(/\}\]$/gs, '');

  fs.writeFileSync(p, content);
});
console.log('Cleaned up MDX files completely.');
