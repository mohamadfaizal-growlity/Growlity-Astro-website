import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. Global Settings
const globalSettings = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/global-settings" }),
  schema: z.object({
    siteName: z.string(),
    tagline: z.string().optional(),
    logoLight: z.string().optional(),
    logoDark: z.string().optional(),
    favicon: z.string().optional(),
    openGraphDefaultImage: z.string().optional(),
    contactEmail: z.string().optional(),
    salesEmail: z.string().optional(),
    supportEmail: z.string().optional(),
    phone1: z.string().optional(),
    phone2: z.string().optional(),
    indiaOffice: z.string().optional(),
    uaeOffice: z.string().optional(),
    ukOffice: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    scheduleConsultationUrl: z.string().optional(),
    whatsappUrl: z.string().optional(),
    contactPageUrl: z.string().optional(),
    announcementBar: z.string().optional(),
    footerText: z.string().optional(),
    cookieConsentText: z.string().optional(),
    popupSettings: z.string().optional(),
  })
});

// 2. Pages
const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    heroTitle: z.string().optional(),
    heroDescription: z.string().optional(),
    heroImage: z.string().optional(),
    showFaqs: z.boolean().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    ogImage: z.string().optional()
  }),
});

// 3. Solutions
const solutions = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/solutions" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    featuredImage: z.string().optional(),
    shortDescription: z.string(),
    problemStatement: z.string().optional(),
    benefits: z.array(z.string()).optional(),
    serviceProcess: z.array(z.string()).optional(),
    deliverables: z.array(z.string()).optional(),
    industriesServed: z.array(z.string()).optional(),
    relatedCaseStudies: z.array(z.string()).optional(),
    relatedBlogs: z.array(z.string()).optional(),
    showFaqs: z.boolean().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional()
  })
});

// 4. Solution Categories
const solutionCategories = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/solution-categories" }),
  schema: z.object({
    title: z.string(),
  })
});

// 5. Blog Posts
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    featuredImage: z.string().optional(),
    author: z.string(),
    publishedDate: z.date(),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    excerpt: z.string().optional(),
    readingTime: z.string().optional(),
    relatedBlogs: z.array(z.string()).optional(),
    relatedSolutions: z.array(z.string()).optional(),
    featuredBlogToggle: z.boolean().optional(),
    showFaqs: z.boolean().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional()
  })
});

// 6. Blog Categories
const blogCategories = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog-categories" }),
  schema: z.object({
    title: z.string(),
  })
});

// 7. Tags
const tags = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/tags" }),
  schema: z.object({
    title: z.string(),
  })
});

// 8. Experts
const experts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experts" }),
  schema: z.object({
    name: z.string(),
    photo: z.string().optional(),
    designation: z.string().optional(),
    bio: z.string().optional(),
    linkedin: z.string().optional(),
    email: z.string().optional()
  })
});

// 9. Case Studies
const caseStudies = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/case-studies" }),
  schema: z.object({
    clientName: z.string(),
    industry: z.string(),
    clientLogo: z.string().optional(),
    thumbnail: z.string().optional(),
    challenge: z.string().optional(),
    solution: z.string().optional(),
    implementation: z.string().optional(),
    results: z.string().optional(),
    metrics: z.array(z.string()).optional(),
    testimonial: z.string().optional(),
    relatedSolution: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional()
  })
});

// 10. Webinars
const webinars = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/webinars" }),
  schema: z.object({
    title: z.string(),
    banner: z.string().optional(),
    speaker: z.string(),
    speakerBio: z.string().optional(),
    date: z.date(),
    time: z.string(),
    timezone: z.string(),
    registrationLink: z.string().optional(),
    recordingLink: z.string().optional(),
    upcomingToggle: z.boolean().optional(),
    seoTitle: z.string().optional()
  })
});

// 11. Publications
const publications = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    pdfUpload: z.string().optional(),
    category: z.string(),
    publishDate: z.date(),
    seoTitle: z.string().optional()
  })
});

// 12. Team
const team = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/team" }),
  schema: z.object({
    name: z.string(),
    designation: z.string(),
    photo: z.string().optional(),
    bio: z.string().optional(),
    linkedin: z.string().optional(),
    email: z.string().optional(),
    order: z.number().default(0)
  })
});

// 13. Testimonials
const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/testimonials" }),
  schema: z.object({
    clientName: z.string(),
    company: z.string(),
    designation: z.string().optional(),
    photo: z.string().optional(),
    rating: z.number().max(5).default(5),
    quote: z.string(),
    linkedCaseStudy: z.string().optional(),
    order: z.number().default(0),
    featured: z.boolean().optional()
  })
});

// 14. Clients
const clients = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/clients" }),
  schema: z.object({
    companyName: z.string(),
    logo: z.string().optional(),
    website: z.string().optional(),
    industry: z.string().optional(),
    featured: z.boolean().optional()
  })
});

// 15. FAQs
const faqs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/faqs" }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string().optional(),
    relatedSolution: z.string().optional(),
    order: z.number().default(0)
  })
});

// 16. Statistics
const statistics = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/statistics" }),
  schema: z.object({
    label: z.string(),
    value: z.string(),
    order: z.number().default(0)
  })
});

// 17. CTA Blocks
const ctaBlocks = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/cta-blocks" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    buttonText: z.string(),
    buttonUrl: z.string(),
    backgroundImage: z.string().optional()
  })
});

// 18. Forms
const forms = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/forms" }),
  schema: z.object({
    formName: z.string(),
    formProvider: z.string(),
    formId: z.string(),
    successMessage: z.string().optional()
  })
});

// 19. SEO Defaults
const seoDefaults = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/seo-defaults" }),
  schema: z.object({
    defaultTitle: z.string(),
    defaultDescription: z.string().optional(),
    defaultOgImage: z.string().optional(),
    schemaSettings: z.string().optional(),
    googleAnalyticsId: z.string().optional(),
    googleSearchConsoleId: z.string().optional(),
    metaPixelId: z.string().optional(),
    linkedinInsightTag: z.string().optional()
  })
});

export const collections = {
  globalSettings,
  pages,
  solutions,
  solutionCategories,
  blog,
  blogCategories,
  tags,
  experts,
  caseStudies,
  webinars,
  publications,
  team,
  testimonials,
  clients,
  faqs,
  statistics,
  ctaBlocks,
  forms,
  seoDefaults
};
