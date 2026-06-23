import fs from 'fs';
import { globSync } from 'glob';

const files = globSync('src/content/**/*.mdx');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf-8');
  let original = content;

  // Split by frontmatter
  const parts = content.split('---');
  if (parts.length >= 3) {
    const frontmatter = parts[1];
    let body = parts.slice(2).join('---');
    
    // Remove CSS blocks: /* 1. Hero ... */ .class { ... }
    body = body.replace(/\/\*[\s\S]*?\{[\s\S]*?\}/g, ''); 
    // Also remove any remaining isolated css blocks that start with .class { ... !important ... }
    body = body.replace(/\.[a-zA-Z0-9_-]+[\s\S]*?\{[\s\S]*?\!important[\s\S]*?\}/g, '');
    
    // As a blanket safety net for MDX, let's just escape all remaining { and } in body if any.
    // Actually, escaping them might break components if there are any. But we just used turndown, so there shouldn't be any MDX components.
    body = body.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;');
    // Also escape <style> tags or inline < style if turndown missed it
    body = body.replace(/<style[\s\S]*?<\/style>/gi, '');
    
    content = '---\n' + frontmatter + '---' + body;
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf-8');
    console.log('Cleaned: ' + file);
  }
}
