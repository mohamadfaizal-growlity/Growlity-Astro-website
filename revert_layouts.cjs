const fs = require('fs');
const files = [
  'src/pages/[slug].astro',
  'src/pages/blog/[slug].astro',
  'src/pages/case-studies/[slug].astro',
  'src/pages/solutions/[slug].astro'
];
files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/typeof block\.imageUpload === "object" \? block\.imageUpload\.src : block\.imageUpload/g, 'block.imageUpload');
    fs.writeFileSync(file, content);
  }
});
