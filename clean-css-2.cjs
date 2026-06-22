const fs = require('fs');
const path = require('path');

const dir = 'src/content/blog';
fs.readdirSync(dir).forEach(file => {
  if (!file.endsWith('.mdx')) return;
  const p = path.join(dir, file);
  let content = fs.readFileSync(p, 'utf-8');
  
  // Split by line and filter out lines that contain the critical CSS signature
  const lines = content.split('\n');
  const filteredLines = lines.filter(line => !line.includes('.cta-with-text-wrapper'));
  
  fs.writeFileSync(p, filteredLines.join('\n'));
});
console.log('Cleaned up escaped CSS lines from MDX files.');
