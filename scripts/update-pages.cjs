const fs = require('fs');
const files = [
  'd:/Project/Growlity--theme-new/Growlity/src/pages/[slug].astro',
  'd:/Project/Growlity--theme-new/Growlity/src/pages/webinars/[slug].astro',
  'd:/Project/Growlity--theme-new/Growlity/src/pages/solutions/[slug].astro',
  'd:/Project/Growlity--theme-new/Growlity/src/pages/events/[slug].astro',
  'd:/Project/Growlity--theme-new/Growlity/src/pages/esg-sustainability-publications/[slug].astro',
  'd:/Project/Growlity--theme-new/Growlity/src/pages/case-studie/[slug].astro',
  'd:/Project/Growlity--theme-new/Growlity/src/pages/blogs/[slug].astro'
];

files.forEach(file => {
  if(!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  const depth = file.split('src/pages/')[1].split('/').length - 1;
  const prefix = depth === 0 ? '../' : '../../';
  
  if (!content.includes('import FAQ ')) {
    content = content.replace('import CTA from', `import FAQ from "${prefix}components/mdx/FAQ.astro";\nimport FAQItem from "${prefix}components/mdx/FAQItem.astro";\nimport CTA from`);
  }
  
  content = content.replace(/components=\{\{\s*Callout,\s*YouTube,\s*CTA,\s*a:\s*MarkdownLink\s*\}\}/g, 'components={{ Callout, YouTube, CTA, FAQ, FAQItem, a: MarkdownLink }}');
  
  content = content.replace(/\{\s*\/\*\s*FAQ BLOCK\s*\*\/\s*\}(?:[^\{]|\{(?!s*\/\*))*\}(?=\s*\{|\s*<\/section>)/s, '');
  content = content.replace(/\{\s*\/\*\s*CTA BLOCK\s*\*\/\s*\}(?:[^\{]|\{(?!s*\/\*))*\}(?=\s*\{|\s*<\/section>)/s, '');
  
  // Actually, a simpler regex for block removal, assuming they are the last things before </section>:
  content = content.replace(/\{\s*\/\*\s*FAQ BLOCK\s*\*\/\s*\}.*?(?=\{\s*\/\*\s*CTA BLOCK|\s*<\/section>)/s, '');
  content = content.replace(/\{\s*\/\*\s*CTA BLOCK\s*\*\/\s*\}.*?(?=\s*<\/section>)/s, '');
  
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
