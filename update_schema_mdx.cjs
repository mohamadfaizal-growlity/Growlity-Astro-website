const fs = require('fs');
const path = require('path');

const schemas = ['blog.json', 'caseStudies.json', 'pages.json', 'solutions.json'];

for (const schema of schemas) {
  const filePath = path.join(__dirname, '.sitepins', 'schema', schema);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/"fileType":\s*"md"/, '"fileType": "mdx"');
  content = content.replace(/"file":\s*"(.*?)\.md"/, '"file": "$1.mdx"');
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Schemas updated');
