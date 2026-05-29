// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://cyanos-lab.com',

  // 国際化ルーティング
  // 日本語 = デフォルト (URL に /ja/ プレフィックスなし)
  // 英語 = /en/ プレフィックス付き
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
