import { ui, defaultLang, type Lang, type UiKey } from './ui';

/**
 * URL から現在の言語を取り出す。
 *   /                 -> 'ja' (default)
 *   /en/              -> 'en'
 *   /legal/...        -> 'ja'
 *   /en/legal/...     -> 'en'
 */
export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split('/');
  if (maybeLang in ui) return maybeLang as Lang;
  return defaultLang;
}

/**
 * 指定言語の文字列を返す。キーが存在しなければデフォルト言語で fallback する。
 */
export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/**
 * 現在のページの "もう一方の言語" の URL を返す。
 * 例:
 *   /              ↔ /en/
 *   /legal/x       ↔ /en/legal/x
 *   /en/legal/x    ↔ /legal/x
 */
export function getAlternateLangUrl(currentUrl: URL, currentLang: Lang): string {
  const path = currentUrl.pathname;
  if (currentLang === 'ja') {
    // ja -> en: /en/ を先頭につける
    if (path === '/') return '/en/';
    return `/en${path}`;
  } else {
    // en -> ja: /en を取り除く
    if (path === '/en' || path === '/en/') return '/';
    return path.replace(/^\/en/, '');
  }
}

/**
 * lang を切り替えた言語コードを返す。
 */
export function getAlternateLang(currentLang: Lang): Lang {
  return currentLang === 'ja' ? 'en' : 'ja';
}
