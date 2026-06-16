import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    heroHeading: z.string().optional(),
    heroSubheading: z.string().optional(),
    sections: z.array(z.object({
      heading: z.string(),
      content: z.string(),
      image: z.string().optional()
    })).optional()
  }),
});

const services = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/services" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    order: z.number().default(0)
  })
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    publishDate: z.date(),
    author: z.string(),
    featuredImage: z.string().optional(),
    description: z.string().optional(),
  })
});

const team = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/team" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string().optional(),
    image: z.string().optional(),
    order: z.number().default(0)
  })
});

const testimonials = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/testimonials" }),
  schema: z.object({
    quote: z.string(),
    authorName: z.string(),
    company: z.string(),
    logo: z.string().optional(),
    order: z.number().default(0)
  })
});

const gallery = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/gallery" }),
  schema: z.object({
    title: z.string(),
    image: z.string(),
    altText: z.string().optional(),
    order: z.number().default(0)
  })
});

const settings = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/settings" }),
  schema: z.object({
    contactEmail: z.string().optional(),
    contactPhone: z.string().optional(),
    contactAddress: z.string().optional(),
    footerText: z.string().optional(),
    socialLinks: z.array(z.object({
      platform: z.string(),
      url: z.string()
    })).optional(),
    menuLinks: z.array(z.object({
      label: z.string(),
      url: z.string()
    })).optional()
  })
});

export const collections = {
  pages,
  services,
  blog,
  team,
  testimonials,
  gallery,
  settings
};
