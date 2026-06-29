// 语言枚举/选项工具：仅依赖静态语言配置（languages.ts），
// 不加载任何翻译消息内容，因此渲染语言下拉、托盘菜单等零成本。
// 翻译消息按需加载见 ./lazyMessages.ts（渲染进程）/ ./main.ts（主进程全量）。

import { LANGUAGE_DISPLAY_NAMES, LANGUAGE_PRIORITY } from './languages';

// 获取所有支持的语言（基于静态配置，无需加载消息）
export const getSupportedLanguages = (): string[] => {
  return Object.keys(LANGUAGE_DISPLAY_NAMES);
};

export const isLanguageSupported = (lang: string): boolean => {
  return getSupportedLanguages().includes(lang);
};

// 获取语言显示名称的映射
export const getLanguageDisplayNames = (): Record<string, string> => {
  return LANGUAGE_DISPLAY_NAMES;
};

// 生成语言选项数组，用于下拉选择等组件
export const getLanguageOptions = () => {
  const supportedLanguages = getSupportedLanguages();
  const displayNames = getLanguageDisplayNames();

  // 按优先级排序
  const sortedLanguages = supportedLanguages.sort((a, b) => {
    const priorityA = LANGUAGE_PRIORITY[a] || 999;
    const priorityB = LANGUAGE_PRIORITY[b] || 999;
    return priorityA - priorityB;
  });

  return sortedLanguages.map((lang) => ({
    label: displayNames[lang] || lang,
    value: lang
  }));
};
