const fs = require('fs');

const files = [
  'src/content/pages/placeholder.md',
  'src/content/blog/placeholder.md',
  'src/content/solutions/placeholder.md',
  'src/content/case-studies/placeholder.md'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // Regex to remove the Banner Image block
    content = content.replace(/  - blockType: "Banner Image"\n    imageUpload: "https:\/\/via\.placeholder\.com\/1200x600"\n    imageCaption: "Sample Banner Caption"\n/g, '');
    fs.writeFileSync(file, content);
  }
});
