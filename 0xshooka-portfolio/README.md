# okashoko website

岡翔子の個人サイト。ハブ用途の静的サイトで、Astro 5 + Tailwind 4 + GitHub Pages で構築。

## 設計方針

- **refined minimalism** — 暖色系の白と黒、控えめな朱色のアクセント
- **日英並走** — Astro 組み込みの i18n ルーティングを使用、日本語がデフォルト
- **コンテンツファースト** — 単一カラム、generous whitespace、可読性最優先

## 技術スタック

- [Astro 5](https://astro.build/) — 静的サイトジェネレーター
- [Tailwind 4](https://tailwindcss.com/) — CSS-first 設定
- [Satoshi](https://www.fontshare.com/fonts/satoshi) (Fontshare) — display + body 兼用の幾何学的サンセリフ
- [Zen Kaku Gothic New](https://fonts.google.com/specimen/Zen+Kaku+Gothic+New) (Google Fonts) — 日本語

## セットアップ

```sh
npm install
npm run dev
```

`http://localhost:4321` で開発サーバーが立ち上がる。

## ディレクトリ構造

```
0xshooka-portfolio/
├── astro.config.mjs           # Astro + i18n 設定
├── package.json
├── tsconfig.json
├── public/
│   ├── CNAME                  # GitHub Pages カスタムドメイン (要更新)
│   └── favicon.svg
├── src/
│   ├── styles/
│   │   └── global.css         # デザイントークン + Tailwind + 共通スタイル
│   ├── i18n/
│   │   ├── ui.ts              # 翻訳辞書 (日英)
│   │   └── utils.ts           # i18n ヘルパー関数
│   ├── layouts/
│   │   ├── BaseLayout.astro   # 全ページ共通レイアウト (head, header, footer)
│   │   └── LegalLayout.astro  # 法的文書 (markdown) 用レイアウト
│   ├── components/
│   │   ├── Header.astro       # ナビ + 言語切替
│   │   └── Footer.astro
│   └── pages/
│       ├── index.astro                          # 日本語トップ (/)
│       ├── legal/selinsa/privacy.md             # selinsa プライバシーポリシー (日)
│       └── en/
│           ├── index.astro                      # 英語トップ (/en/)
│           └── legal/selinsa/privacy.md         # selinsa プライバシーポリシー (英)
└── .github/workflows/
    └── deploy.yml             # GitHub Actions による Pages デプロイ
```

## URL の対応関係

| 内容 | 日本語 | 英語 |
| --- | --- | --- |
| トップ | `/` | `/en/` |
| selinsa プライバシー | `/legal/selinsa/privacy/` | `/en/legal/selinsa/privacy/` |
| プロジェクト一覧 (未実装) | `/projects/` | `/en/projects/` |
| 著書 (未実装) | `/books/` | `/en/books/` |

## ページを追加する手順

新規ページの場合、日本語版と英語版を両方作成する。

例: `/about/` ページを追加する場合

1. `src/pages/about.astro` (日本語)
2. `src/pages/en/about.astro` (英語)
3. ナビゲーションに必要なら `src/i18n/ui.ts` にラベルを追加
4. リンクは `src/components/Header.astro` で構築済み

## 法的文書 (.md) の追加

selinsa 以外の今後の文書 (例えば Sonde のプライバシーポリシー) も同じ仕組みで追加する。

```
src/pages/legal/sonde/privacy.md
src/pages/en/legal/sonde/privacy.md
```

各 markdown ファイルの先頭に以下の frontmatter を入れる:

```yaml
---
layout: ../../../layouts/LegalLayout.astro  # パスは階層に応じて調整
title: ドキュメントタイトル
description: ページ概要
lastUpdated: YYYY年MM月DD日
---
```

## GitHub Pages へのデプロイ

### 初回セットアップ

1. このリポジトリを GitHub にプッシュ (推奨リポジトリ名: `<username>.github.io` ではなく `website` などプロジェクト名)
2. GitHub リポジトリの Settings → Pages で、Source を **"GitHub Actions"** に設定
3. `astro.config.mjs` の `site` をカスタムドメインに変更
4. `public/CNAME` をカスタムドメインに変更 (現在は `example.com` プレースホルダ)
5. Cloudflare 側で DNS レコードを設定 (詳細は事前のチャット参照)
6. `main` ブランチに push すると自動的にデプロイされる

### カスタムドメインの設定

GitHub リポジトリの Settings → Pages → Custom domain でドメインを入力し、保存。
Cloudflare 側で A レコード (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
`185.199.111.153`) を設定済みであることを確認。

## デザイントークンのカスタマイズ

色やフォントを調整するときは `src/styles/global.css` の `@theme` ブロックを編集。

```css
@theme {
  --color-canvas: #fafaf7;     /* 背景 */
  --color-ink: #0e1014;        /* 文字 (濃) */
  --color-accent: #c8483b;     /* アクセント (朱) */
  /* ... */
}
```

## 今後追加していくページ案

- `/about/` — 詳細プロフィール
- `/books/` — 著書一覧 (まずは『MCPサーバー開発大全』)
- `/projects/selinsa/` — selinsa の詳細紹介
- `/projects/sonde/` — Sonde の紹介
- `/papers/` — 論文一覧 (将来)
- `/contact/` — 連絡先

## 注意事項 (公開前チェックリスト)

- [ ] `astro.config.mjs` の `site` を本番ドメインに変更
- [ ] `public/CNAME` を本番ドメインに変更
- [ ] `src/pages/legal/selinsa/privacy.md` のプレースホルダ (`[屋号]` `[住所]` `[メールアドレス]`) を実値に置換
- [ ] 英語版プライバシーポリシーをレビュー (現在はプレースホルダ・ノート付き)
- [ ] favicon.svg を正式なロゴに差し替え
- [ ] OGP 用の画像 (`public/og-image.png`) を追加
- [ ] Google Search Console と Bing Webmaster Tools の認証
