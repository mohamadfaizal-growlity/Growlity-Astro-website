const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, 'src', 'components', 'admin');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  // We want to add cursor-pointer to className if there is an onClick in the same tag.
  // Instead of line-by-line, let's use a regex that matches an entire HTML tag opening.
  // Match <TagName ... >
  const tagRegex = /<([a-zA-Z0-9]+)([^>]+)>/g;
  
  content = content.replace(tagRegex, (match, tagName, attrs) => {
    // If it has onClick
    if (attrs.includes('onClick={') || attrs.includes('onClick=')) {
      // If it already has cursor-pointer, ignore
      if (attrs.includes('cursor-pointer')) return match;
      
      // If it's a button or a, we don't strict *need* it, but user wants it explicitly
      
      // Check if it has className="..." or className={'...'}
      // Simple case: className="something"
      if (/className=(["'])(.*?)\1/.test(attrs)) {
        attrs = attrs.replace(/className=(["'])(.*?)\1/, (cMatch, quote, classes) => {
          return `className=${quote}${classes} cursor-pointer${quote}`;
        });
        return `<${tagName}${attrs}>`;
      } 
      // Case: className={...}
      else if (/className=\{([^}]+)\}/.test(attrs)) {
        // className={`foo ${bar}`} -> className={`foo ${bar} cursor-pointer`}
        attrs = attrs.replace(/className=\{([^}]+)\}/, (cMatch, inner) => {
          // If it's a template literal
          if (inner.startsWith('`') && inner.endsWith('`')) {
            return `className={${inner.slice(0, -1)} cursor-pointer\`}`;
          }
          // If it's just a variable or something else, we might break it. 
          // So we skip or do something smart. For now, let's just append it using string concat
          return `className={${inner} + " cursor-pointer"}`;
        });
        return `<${tagName}${attrs}>`;
      }
      // Case: no className
      else {
        return `<${tagName} className="cursor-pointer"${attrs}>`;
      }
    }
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Modified', filePath);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

walkDir(adminDir);
