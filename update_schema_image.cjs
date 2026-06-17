const fs = require('fs');
let code = fs.readFileSync('src/content.config.ts', 'utf8');

// Replace the constant with a function
code = code.replace(
  /const pageBlocksSchema = z\.array\(z\.object\(\{[\s\S]*?\}\)\)\.optional\(\);/,
  `const getPageBlocksSchema = ({ image }) => z.array(z.object({
  blockType: z.enum(['Text Content', 'FAQ Section', 'CTA Section', 'Banner Image']),
  textContent: z.string().optional(),
  faqList: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
  ctaReference: z.string().optional(),
  imageUpload: image().optional(),
  imageCaption: z.string().optional()
})).optional();`
);

// Replace schema: z.object({ ... }) with schema: ({ image }) => z.object({ ... })
code = code.replace(/schema: z\.object\(\{/g, 'schema: ({ image }) => z.object({');

// Replace pageBlocks: pageBlocksSchema with pageBlocks: getPageBlocksSchema({ image })
code = code.replace(/pageBlocks: pageBlocksSchema/g, 'pageBlocks: getPageBlocksSchema({ image })');

fs.writeFileSync('src/content.config.ts', code);
