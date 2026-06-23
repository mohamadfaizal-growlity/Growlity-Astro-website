const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/content/**/*.mdx');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  let original = content;

  // Split by lines
  let lines = content.split('\n');
  let newLines = [];
  for (let line of lines) {
    // If the line contains CSS-like syntax that leaked from WordPress builders (e.g. Bricks or WP Bakery)
    // such as "/* 1. Hero Section Padding Fix */ .Hero-section-with-title { padding: 0 !important; }"
    // or just generic {} which breaks MDX.
    // We will look for common CSS patterns that break MDX.
    if (line.includes('{') || line.includes('}')) {
      if (line.includes('/*') || line.includes('!important') || line.includes('@media') || line.includes('font-family:') || line.includes('.brxe-')) {
        // Skip this CSS line
        continue;
      }
      
      // If it has { or } but isn't obvious CSS, escape them so MDX doesn't crash
      // But only if we are not in frontmatter
    }
    
    // Quick escape for remaining unescaped braces outside frontmatter
    // To be safe, we'll just escape { and } globally if they are still on the line, but we need to preserve frontmatter!
    newLines.push(line);
  }
  
  content = newLines.join('\n');
  
  // Now let's carefully escape `{` and `}` that are in the body
  // Frontmatter is between the first two `---`
  const parts = content.split('---');
  if (parts.length >= 3) {
    const frontmatter = parts[1];
    let body = parts.slice(2).join('---');
    
    // Remove leaked CSS blocks we might have missed
    body = body.replace(/\/\*[\s\S]*?\*\//g, ''); // remove block comments
    body = body.replace(/\{[^}]*\!important[^}]*\}/g, ''); // remove remaining css blocks with !important
    
    // Escape { and }
    body = body.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
    
    content = '---\n' + frontmatter + '---' + body;
  }

  // Also replace < and > that might break MDX if they are not valid tags
  // Actually replacing { } is usually enough for MDX.

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log('Cleaned: ' + file);
  }
}
