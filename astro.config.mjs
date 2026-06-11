// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

// 正式上線換成你的網域
const SITE = 'https://www.vossic.com';

export default defineConfig({
  site: SITE,
  // i18n：中文為預設（網址不帶前綴），英文放在 /en/
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [react(), mdx(), sitemap(), keystatic()],
  // 大部分頁面會 prerender 成靜態檔（SEO 佳）；
  // 只有 Keystatic 後台路由需要 server，故掛 adapter。
  // 部署到 Cloudflare Pages 時，把 node 換成 @astrojs/cloudflare。
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  vite: {
    plugins: [tailwindcss()],
  },
});
