const fs = require('fs');
const path = require('path');

const collections = [
  'global-settings',
  'pages',
  'solutions',
  'solution-categories',
  'blog',
  'blog-categories',
  'tags',
  'authors',
  'case-studies',
  'webinars',
  'publications',
  'team',
  'testimonials',
  'clients',
  'faqs',
  'statistics',
  'cta-blocks',
  'forms',
  'seo-defaults'
];

const mediaFolders = [
  'logos',
  'blogs',
  'solutions',
  'team',
  'clients',
  'webinars',
  'publications'
];

// Create content folders and dummy files
collections.forEach(col => {
  const dirPath = path.join(__dirname, 'src', 'content', col);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  const dummyFile = path.join(dirPath, 'placeholder.md');
  if (!fs.existsSync(dummyFile)) {
    // Generate minimal frontmatter
    let frontmatter = '---\n';
    if (col === 'global-settings') frontmatter += 'siteName: "Growlity"\n';
    else if (col === 'pages') frontmatter += 'title: "Sample Page"\n';
    else if (col === 'solutions') frontmatter += 'title: "Sample Solution"\ncategory: "Sample Category"\nshortDescription: "Sample Description"\n';
    else if (col === 'solution-categories' || col === 'blog-categories' || col === 'tags') frontmatter += 'title: "Sample Title"\n';
    else if (col === 'blog') frontmatter += 'title: "Sample Blog"\nauthor: "Admin"\npublishedDate: 2026-06-16T00:00:00.000Z\ncategory: "General"\n';
    else if (col === 'authors') frontmatter += 'name: "Admin"\n';
    else if (col === 'case-studies') frontmatter += 'clientName: "Acme Corp"\nindustry: "Tech"\n';
    else if (col === 'webinars') frontmatter += 'title: "Upcoming Webinar"\nspeaker: "John Doe"\ndate: 2026-06-16T00:00:00.000Z\ntime: "10:00 AM"\ntimezone: "EST"\n';
    else if (col === 'publications') frontmatter += 'title: "Annual Report"\ncategory: "Reports"\npublishDate: 2026-06-16T00:00:00.000Z\n';
    else if (col === 'team') frontmatter += 'name: "Jane Doe"\ndesignation: "CEO"\n';
    else if (col === 'testimonials') frontmatter += 'clientName: "John Smith"\ncompany: "Acme"\nquote: "Great service!"\n';
    else if (col === 'clients') frontmatter += 'companyName: "Acme Corp"\n';
    else if (col === 'faqs') frontmatter += 'question: "How does it work?"\nanswer: "It works well."\n';
    else if (col === 'statistics') frontmatter += 'label: "Clients"\nvalue: "100+"\n';
    else if (col === 'cta-blocks') frontmatter += 'title: "Get Started"\nbuttonText: "Click Here"\nbuttonUrl: "/contact"\n';
    else if (col === 'forms') frontmatter += 'formName: "Contact"\nformProvider: "HubSpot"\nformId: "123"\n';
    else if (col === 'seo-defaults') frontmatter += 'defaultTitle: "Growlity"\n';
    frontmatter += '---\nPlaceholder content for ' + col;
    
    fs.writeFileSync(dummyFile, frontmatter);
  }
});

// Create media folders
mediaFolders.forEach(folder => {
  const dirPath = path.join(__dirname, 'public', folder);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

console.log('Setup complete!');
