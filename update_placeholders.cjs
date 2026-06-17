const fs = require('fs');
const files = [
  'src/content/pages/placeholder.md',
  'src/content/blog/placeholder.md',
  'src/content/solutions/placeholder.md',
  'src/content/case-studies/placeholder.md'
];

const bannerBlock = `  - blockType: "Banner Image"
    imageUpload: "https://via.placeholder.com/1200x600"
    imageCaption: "Sample Banner Caption"
`;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/\n---(\s*)$/m, '\n' + bannerBlock + '---$1');
    fs.writeFileSync(file, content);
  }
});
