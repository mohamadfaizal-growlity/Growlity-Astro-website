const fs = require('fs');
const files = [
  'src/content/pages/placeholder.md',
  'src/content/blog/placeholder.md',
  'src/content/solutions/placeholder.md',
  'src/content/case-studies/placeholder.md'
];

const blockYaml = `pageBlocks:
  - blockType: "Text Content"
    textContent: "Write your text here..."
  - blockType: "FAQ Section"
    faqCategory: "ecovadis"`;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('pageBlocks:')) {
      content = content.replace(/\n---\n(Placeholder.*)$/, '\n' + blockYaml + '\n---\n$1');
      fs.writeFileSync(file, content);
    }
  }
});
