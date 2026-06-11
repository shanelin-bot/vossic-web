import { config, fields, collection } from '@keystatic/core';

// 內容欄位（產品）— 中英共用同一組 schema
function productSchema(label: string, path: `${string}/*`) {
  return collection({
    label,
    slugField: 'name',
    path,
    format: { contentField: 'body' },
    entryLayout: 'content',
    schema: {
      name: fields.slug({
        name: { label: '產品名稱', description: '例如 BMS、CortexDC' },
      }),
      tagline: fields.text({ label: '一句話價值主張' }),
      summary: fields.text({ label: '卡片簡述', multiline: true }),
      order: fields.integer({ label: '排序（數字小的在前）', defaultValue: 0 }),
      screenshot: fields.text({ label: '產品截圖路徑（例如 /images/products/bms.png）' }),
      painPoints: fields.array(fields.text({ label: '痛點' }), {
        label: '客戶痛點',
        itemLabel: (p) => p.value || '（空白）',
      }),
      features: fields.array(
        fields.object({
          title: fields.text({ label: '功能標題' }),
          desc: fields.text({ label: '功能說明', multiline: true }),
        }),
        { label: '核心功能', itemLabel: (p) => p.fields.title.value || '（未命名）' }
      ),
      useCases: fields.array(fields.text({ label: '情境' }), {
        label: '適用情境',
        itemLabel: (p) => p.value || '（空白）',
      }),
      body: fields.mdx({ label: '詳細內容（選填）' }),
    },
  });
}

export default config({
  // 開發階段用 local（直接讀寫本機檔案）。
  // 正式給非技術同事使用時，改成：
  //   storage: { kind: 'cloud' }, cloud: { project: 'your-team/vossic-web' }
  // 或 GitHub 模式，並掛上對應 adapter。詳見 README。
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'Vossic CMS' },
    navigation: {
      產品: ['productsZh', 'productsEn'],
      消息: ['newsZh'],
    },
  },
  collections: {
    productsZh: productSchema('產品（中文）', 'src/content/products/zh/*'),
    productsEn: productSchema('Products (English)', 'src/content/products/en/*'),
    newsZh: collection({
      label: '最新消息（中文）',
      slugField: 'title',
      path: 'src/content/news/zh/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: '標題' } }),
        date: fields.date({ label: '日期' }),
        excerpt: fields.text({ label: '摘要', multiline: true }),
        body: fields.mdx({ label: '內文' }),
      },
    }),
  },
});
