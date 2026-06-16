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
    content = content.replace(/faqCategory: "ecovadis"/g, 'faqList:\n      - question: "Sample Question?"\n        answer: "Sample Answer."');
    fs.writeFileSync(file, content);
  }
});
