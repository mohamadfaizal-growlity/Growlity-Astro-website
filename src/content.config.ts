import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 1. Global Settings
const globalSettings = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/global-settings" }),
  schema: ({ image }) => z.object({
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
    disqusShortname: z.string().optional(),
    enablePopup: z.boolean().default(false).optional(),
    popupHeadline: z.string().optional(),
    popupMessage: z.string().optional(),
    popupButtonText: z.string().optional(),
    popupButtonLink: z.string().optional(),
    headerScripts: z.string().optional(),
    footerScripts: z.string().optional(),
  })
});

// 2. Pages
const pages = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    ogImage: z.string().optional(),
    heroSection: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      image: z.string().optional(),
    }).optional(),
    seoSettings: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }).optional(),
    bottomSection: z.object({
      text: z.string().optional(),
    }).optional(),
    bannerSection: z.object({
      image: z.string().optional(),
      caption: z.string().optional(),
    }).optional(),
    faqSection: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).optional(),
    ctaSection: z.object({
      reference: z.string().optional()
    }).optional()
  }),
});

// 3. Services
const services = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/services" }),
  schema: ({ image }) => z.object({
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
    seoSettings: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }).optional(),
    bottomSection: z.object({
      text: z.string().optional(),
    }).optional(),
    bannerSection: z.object({
      image: z.string().optional(),
      caption: z.string().optional(),
    }).optional(),
    faqSection: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    ctaSection: z.object({
      reference: z.string().optional()
    }).optional()
  })
});

// 5. Blogs
const blogs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blogs" }),
  schema: ({ image }) => z.object({
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
    featuredBlogToggle: z.boolean().default(false),
    draft: z.boolean().default(false),
    seoSettings: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }).optional(),
    bottomSection: z.object({
      text: z.string().optional(),
    }).optional(),
    bannerSection: z.object({
      image: z.string().optional(),
      caption: z.string().optional(),
    }).optional(),
    faqSection: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    ctaSection: z.object({
      reference: z.string().optional()
    }).optional()
  })
});

// 8. Experts
const experts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/experts" }),
  schema: ({ image }) => z.object({
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
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/case-studies" }),
  schema: ({ image }) => z.object({
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
    seoSettings: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
    }).optional(),
    bottomSection: z.object({
      text: z.string().optional(),
    }).optional(),
    bannerSection: z.object({
      image: z.string().optional(),
      caption: z.string().optional(),
    }).optional(),
    faqSection: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
    ctaSection: z.object({
      reference: z.string().optional()
    }).optional()
  })
});

// 10. Webinars
const webinars = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/webinars" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    banner: z.string().optional(),
    speaker: z.string(),
    speakerBio: z.string().optional(),
    date: z.date(),
    time: z.string(),
    timezone: z.string(),
    registrationLink: z.string().optional(),
    recordingLink: z.string().optional(),
    upcomingToggle: z.boolean().default(true),
    seoTitle: z.string().optional()
  })
});

// 11. Publications
const publications = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/publications" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    pdfUpload: z.string().optional(),
    category: z.string(),
    publishDate: z.date(),
    draft: z.boolean().default(false),
    seoTitle: z.string().optional()
  })
});

// 13. Testimonials
const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/testimonials" }),
  schema: ({ image }) => z.object({
    clientName: z.string(),
    company: z.string(),
    designation: z.string().optional(),
    photo: z.string().optional(),
    rating: z.number().max(5).default(5),
    quote: z.string(),
    linkedCaseStudy: z.string().optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false)
  })
});

// 14. Customers
const customers = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/customers" }),
  schema: ({ image }) => z.object({
    companyName: z.string(),
    logo: z.string().optional(),
    website: z.string().optional(),
    industry: z.string().optional(),
    featured: z.boolean().default(false)
  })
});

// 15. Forms
const forms = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/forms" }),
  schema: ({ image }) => z.object({
    title: z.string(),
    sendToEmail: z.string().optional(),
    fields: z.preprocess((val) => {
      if (val === "" || val === null || val === undefined) return [];
      return val;
    }, z.array(z.object({
      label: z.string(),
      type: z.enum(['text', 'email', 'tel', 'textarea', 'checkbox']).optional().default('text'),
      required: z.boolean().default(true),
      placeholder: z.string().optional()
    }))).optional().default([]),
    submitButtonText: z.string().default('Submit'),
    successMessage: z.string().default('Thank you! Your submission has been received.')
  })
});

// 16. Form Entries
const entries = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/entries" }),
  schema: z.object({
    formId: z.string(),
    submittedFrom: z.string().optional(),
    submittedAt: z.string(),
    data: z.record(z.string(), z.any())
  })
});

export const collections = {
  globalSettings,
  pages,
  services,
  blogs,
  experts,
  caseStudies,
  webinars,
  publications,
  testimonials,
  customers,
  forms,
  entries
};




