export const ComponentRegistry = [
  {
    id: 'Hero',
    name: 'Hero Section',
    icon: 'LayoutTemplate',
    variants: [
      { id: 'default', name: 'Default (Light)' },
      { id: 'dark', name: 'Dark Theme' },
      { id: 'split', name: 'Split Content/Image' }
    ],
    fields: [
      { name: 'title', label: 'Heading', type: 'string' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'ctaText', label: 'Button Text', type: 'string' },
      { name: 'ctaLink', label: 'Button Link', type: 'string' }
    ]
  },
  {
    id: 'Features',
    name: 'Features Grid',
    icon: 'Grid',
    variants: [
      { id: 'three-col', name: '3 Columns' },
      { id: 'two-col', name: '2 Columns' },
      { id: 'cards', name: 'Card Style' }
    ],
    fields: [
      { name: 'sectionTitle', label: 'Section Title', type: 'string' },
      { name: 'items', label: 'Feature Items (JSON)', type: 'textarea' }
    ]
  },
  {
    id: 'TextContent',
    name: 'Rich Text Block',
    icon: 'Type',
    variants: [
      { id: 'default', name: 'Standard Width' },
      { id: 'narrow', name: 'Reading Width' },
      { id: 'full', name: 'Full Width' }
    ],
    fields: [
      { name: 'content', label: 'Content (Markdown/HTML)', type: 'textarea' }
    ]
  },
  {
    id: 'FAQ',
    name: 'FAQ Accordion',
    icon: 'HelpCircle',
    variants: [
      { id: 'default', name: 'Default List' },
      { id: 'grouped', name: 'Grouped Categories' }
    ],
    fields: [
      { name: 'title', label: 'Section Title', type: 'string' },
      { name: 'faqs', label: 'FAQs Data (JSON)', type: 'textarea' }
    ]
  },
  {
    id: 'ImageGallery',
    name: 'Image Gallery',
    icon: 'Grid',
    variants: [
      { id: 'grid', name: 'Standard Grid' },
      { id: 'masonry', name: 'Masonry Layout' },
      { id: 'carousel', name: 'Carousel Slider' }
    ],
    fields: [
      { name: 'galleryTitle', label: 'Gallery Title', type: 'string' },
      { name: 'images', label: 'Image URLs (Comma separated)', type: 'textarea' }
    ]
  },
  {
    id: 'Testimonial',
    name: 'Client Testimonial',
    icon: 'Type',
    variants: [
      { id: 'single', name: 'Single Featured' },
      { id: 'grid', name: 'Testimonial Grid' }
    ],
    fields: [
      { name: 'quote', label: 'Quote', type: 'textarea' },
      { name: 'author', label: 'Author Name', type: 'string' },
      { name: 'company', label: 'Company / Position', type: 'string' },
      { name: 'avatar', label: 'Avatar URL', type: 'string' }
    ]
  },
  {
    id: 'CallToAction',
    name: 'Call To Action (CTA)',
    icon: 'LayoutTemplate',
    variants: [
      { id: 'simple', name: 'Simple Centered' },
      { id: 'split', name: 'Split with Image' }
    ],
    fields: [
      { name: 'heading', label: 'Heading', type: 'string' },
      { name: 'subtext', label: 'Subtext', type: 'textarea' },
      { name: 'buttonText', label: 'Button Text', type: 'string' },
      { name: 'buttonLink', label: 'Button Link', type: 'string' },
      { name: 'bgImage', label: 'Background Image URL', type: 'string' }
    ]
  }
];
