import { DEFAULT_LANGUAGE } from './languages';

// 主进程全量加载所有语言（Node 环境，体积不敏感；托盘菜单需即时切换）。
// 渲染进程的按需加载见 ./lazyMessages.ts，两者刻意解耦避免 glob 互相污染。
const allLangModules = import.meta.glob('./lang/**/*.ts', { eager: true });
const messages: Record<string, Record<string, any>> = {};
Object.entries(allLangModules).forEach(([path, module]) => {
  const match = path.match(/\.\/lang\/([^/]+)\/([^/]+)\.ts$/);
  if (match && match[2] !== 'index') {
    const [, langCode, moduleName] = match;
    if (!messages[langCode]) messages[langCode] = {};
    messages[langCode][moduleName] = (module as any).default;
  }
});

type Language = keyof typeof messages;

// 为主进程提供一个简单的 i18n 实现
const mainI18n = {
  global: {
    currentLocale: DEFAULT_LANGUAGE as Language,
    get locale() {
      return this.currentLocale;
    },
    set locale(value: Language) {
      this.currentLocale = value;
    },
    t(key: string) {
      const keys = key.split('.');
      let current: any = messages[this.currentLocale];
      for (const k of keys) {
        if (current[k] === undefined) {
          // 如果找不到翻译，返回键名
          return key;
        }
        current = current[k];
      }
      return current;
    },
    messages
  }
};

export type { Language };
export default mainI18n;
