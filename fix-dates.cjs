const fs = require('fs');
const path = require('path');

const dir = 'src/content/blog';
fs.readdirSync(dir).forEach(file => {
  if (!file.endsWith('.mdx')) return;
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf-8');
  content = content.replace(/^publishedDate: "(.*)"$/m, 'publishedDate: $1');
  fs.writeFileSync(p, content);
});
console.log('Fixed quotes in dates in all mdx files.');
