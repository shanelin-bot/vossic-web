# Vossic 官網（Astro + Keystatic 起手包）

沃司官網翻新的可運行骨架：**Astro 5 + Tailwind v4 + Keystatic CMS + 中英雙語**。
產品內容用 Content Collections 結構化，非技術同事透過 Keystatic 後台即可編輯。

---

## 快速開始

```bash
npm install
npm run dev        # 開發站 → http://localhost:4321
                   # CMS 後台 → http://localhost:4321/keystatic
npm run build      # 產出靜態網站到 dist/
npm run preview    # 本機預覽 build 結果
```

> Node 18+（建議 20/22）。

---

## 專案結構

```
src/
├── content/
│   ├── products/zh/   bms.mdx · cortexdc.mdx · dsim.mdx   ← 中文產品
│   ├── products/en/   bms.mdx …                           ← 英文產品
│   └── news/zh/        新聞，一篇一檔
├── content.config.ts   內容 schema（型別檢查，欄位漏填 build 會報錯）
├── i18n/ui.ts          介面字串（按鈕、選單…非內容）
├── layouts/Base.astro  HTML 外殼、字體、SEO meta
├── components/         Header · Footer
├── pages/
│   ├── index.astro             中文首頁（預設，網址 /）
│   ├── products/[slug].astro   中文產品頁
│   └── en/…                    英文鏡像（網址 /en/…）
└── styles/global.css   設計系統（色彩 / 字體 token）
keystatic.config.tsx    CMS 後台設定
public/_redirects       舊站 .html 網址 301 轉址
```

## 設計系統

「控制室／儀表板」風格：深板岩藍基底、單一 teal signal 強調色、amber 僅用於風險示警，
字體採 IBM Plex 全家族（Sans / Sans TC / Mono），雙語一致、工程感、可信。
所有色彩與字體 token 定義在 `src/styles/global.css` 的 `@theme`；
改色只需改這裡，全站連動。對應 Tailwind 語意 class：`bg-ink`、`text-tx-invert`、`text-signal`、`border-line-light` 等。

---

## 新增 / 修改內容

**方法 A — 後台（給非技術同事）**：`/keystatic` → 選「產品」或「消息」→ 編輯 → 儲存。
**方法 B — 直接改檔**：編輯 `src/content/` 下的 `.mdx`，按上方範本填 frontmatter。

> ⚠️ `dsim.mdx` 目前是空殼範本（標示「待補」）。把 Dsim 的定位、痛點、功能補上即可。

---

## 上線給非技術同事用（重要）

開發階段 Keystatic 用 `storage: { kind: 'local' }`（讀寫本機檔，只在 `npm run dev` 有效）。
正式要讓同事遠端編輯，二選一：

1. **Keystatic Cloud（最簡單）**：到 keystatic.cloud 建專案，把 `keystatic.config.tsx` 改成
   ```ts
   storage: { kind: 'cloud' },
   cloud: { project: 'your-team/vossic-web' },
   ```
   同事用 Email 登入即可，完全不碰 GitHub。
2. **GitHub 模式**：`storage: { kind: 'github', repo: 'your-org/vossic-web' }`，同事需有 repo 權限。

兩者都需要伺服器端 API route，所以正式部署要掛 adapter（見下）。
同事每次儲存 = 一次 commit = 觸發一次重新部署（約 1–2 分鐘上線）。

---

## 部署（建議 Cloudflare Pages）

目前 `astro.config.mjs` 用 `@astrojs/node` adapter（方便本機驗證 build）。
部署到 Cloudflare Pages 時換成 Cloudflare adapter：

```bash
npm i @astrojs/cloudflare
```
```js
// astro.config.mjs
import cloudflare from '@astrojs/cloudflare';
export default defineConfig({
  // …
  adapter: cloudflare(),   // 取代 node()
});
```
Cloudflare Pages 設定：build 指令 `npm run build`、輸出目錄 `dist`。
`public/_redirects` 會自動生效（Netlify 同樣支援）。

---

## 上線前檢查清單

- [ ] 補齊 **Dsim** 內容，補 CortexDC / Dsim 的英文版
- [ ] `astro.config.mjs` 的 `site` 換成正式網域
- [ ] 聯絡表單：把 `index.astro` 裡的 Formspree `action` 換成你的 ID，或改用 Cloudflare Pages Functions
- [ ] Keystatic 切換成 Cloud / GitHub 模式 + Cloudflare adapter
- [ ] `public/_redirects` 對照舊站逐條補上（保 SEO）
- [ ] Footer 的 LinkedIn 已從錯誤的 `ufi-space` 改為 `vossic`，確認正確帳號
- [ ] 補上 logo、產品截圖、合作夥伴 logo（放 `public/` 或 `src/assets/`）
- [ ] 補關於我們 / 合作夥伴 / 新聞列表頁（目前首頁有錨點，頁面可依產品頁模式擴充）
```
