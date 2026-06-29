// 渲染进程：按语言懒加载翻译消息。
// 非 eager 的 import.meta.glob 让每个语言模块成为独立动态 chunk，
// 仅在用户当前/切换到的语言才下载，避免 5 种语言全量打入主 bundle。
// 注意：此文件仅供渲染进程引用，主进程请用 ./main.ts 的全量加载。

const langModules = import.meta.glob('./lang/**/*.ts');

/**
 * 加载指定语言的全部翻译模块并合并为消息对象。
 * @param langCode 语言码，如 'zh-CN'
 */
export const loadLanguageMessages = async (langCode: string): Promise<Record<string, any>> => {
  const result: Record<string, any> = {};

  const entries = Object.entries(langModules).filter(([path]) => {
    const match = path.match(/\/lang\/([^/]+)\/([^/]+)\.ts$/);
    return match && match[1] === langCode && match[2] !== 'index';
  });

  await Promise.all(
    entries.map(async ([path, loader]) => {
      const mod: any = await (loader as () => Promise<any>)();
      const moduleName = path.match(/\/lang\/[^/]+\/([^/]+)\.ts$/)?.[1];
      if (moduleName) {
        result[moduleName] = mod.default;
      }
    })
  );

  return result;
};
