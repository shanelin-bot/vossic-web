import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const featureSchema = z.object({
  title: z.string(),
  desc: z.string(),
});

const productSchema = z.object({
  name: z.string(),          // 顯示名稱，例如 BMS
  tagline: z.string(),       // 一句話價值主張
  summary: z.string(),       // 卡片用簡述
  order: z.number().default(0),
  screenshot: z.string().optional().default(''), // 產品截圖路徑
  painPoints: z.array(z.string()).default([]),
  features: z.array(featureSchema).default([]),
  useCases: z.array(z.string()).default([]),
});

// 中文與英文各一個 collection，方便 Keystatic 後台給非技術同事清楚的分類
const productsZh = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/products/zh' }),
  schema: productSchema,
});

const productsEn = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/products/en' }),
  schema: productSchema,
});

const newsZh = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/news/zh' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    excerpt: z.string().default(''),
  }),
});

export const collections = { productsZh, productsEn, newsZh };
