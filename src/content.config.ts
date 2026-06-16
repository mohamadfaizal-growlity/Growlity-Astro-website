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

export const collections = {
  pages,
  services,
};
