const fs = require('fs');

const files = [
  'src/pages/[slug].astro',
  'src/pages/blog/[slug].astro',
  'src/pages/case-studies/[slug].astro',
  'src/pages/solutions/[slug].astro'
];

const bannerBlock = `
        {/* BANNER IMAGE BLOCK */}
        {block.blockType === 'Banner Image' && block.imageUpload && (
          <div class="w-full my-12 relative overflow-hidden group border-y border-gray-100">
            <div class="w-full max-h-[600px] overflow-hidden bg-gray-100 flex items-center justify-center">
              <img src={block.imageUpload} alt={block.imageCaption || "Featured Banner"} class="w-full h-auto min-h-[300px] object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            {block.imageCaption && (
              <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-8 pt-24">
                <p class="text-white text-xl md:text-3xl font-bold max-w-4xl mx-auto text-center drop-shadow-md">{block.imageCaption}</p>
              </div>
            )}
          </div>
        )}
      </section>`;

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<\/section>/g, bannerBlock);
    fs.writeFileSync(file, content);
  }
});
