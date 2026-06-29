import { createI18n } from 'vue-i18n';

import { DEFAULT_LANGUAGE, FALLBACK_LANGUAGE } from './languages';
import { loadLanguageMessages } from './lazyMessages';

// 初始为空消息，按需通过 ensureLanguageLoaded / setI18nLanguage 注入当前语言，
// 避免 5 种语言全量打入主 bundle（启动仅加载当前语言 + 回退语言）。
const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LANGUAGE,
  fallbackLocale: FALLBACK_LANGUAGE,
  messages: {},
  globalInjection: true,
  silentTranslationWarn: true,
  silentFallbackWarn: true
});

const loaded = new Set<string>();

/** 确保某语言的消息已加载（幂等） */
export const ensureLanguageLoaded = async (lang: string): Promise<void> => {
  if (loaded.has(lang)) return;
  const msgs = await loadLanguageMessages(lang);
  i18n.global.setLocaleMessage(lang, msgs);
  loaded.add(lang);
};

/** 切换语言：先确保消息加载，再切换 locale，避免短暂显示 key */
export const setI18nLanguage = async (lang: string): Promise<void> => {
  await ensureLanguageLoaded(lang);
  (i18n.global.locale as any).value = lang;
};

export default i18n;
