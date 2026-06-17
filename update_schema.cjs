const fs = require('fs');
let code = fs.readFileSync('src/content.config.ts', 'utf8');

const blocksDef = `const pageBlocksSchema = z.array(z.object({
  blockType: z.enum(['Text Content', 'FAQ Section', 'CTA Section', 'Banner Image']),
  textContent: z.string().optional(),
  faqList: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
  ctaReference: z.string().optional(),
  imageUpload: z.string().optional(),
  imageCaption: z.string().optional()
})).optional();`;

code = code.replace(/import \{ glob \} from 'astro\/loaders';/, "import { glob } from 'astro/loaders';\n\n" + blocksDef);

const regex = /pageBlocks: z\.array\(z\.object\(\{[\s\S]*?\}\)\)\.optional\(\)/g;
code = code.replace(regex, 'pageBlocks: pageBlocksSchema');

fs.writeFileSync('src/content.config.ts', code);
