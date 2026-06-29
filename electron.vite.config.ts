import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'electron-vite';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import viteCompression from 'vite-plugin-compression';
import VueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig(({ command }) => {
  const isBuild = command === 'build';

  return {
    main: {
      build: {
        rollupOptions: {
          // 额外打包落雪音源主进程沙箱 worker（worker_threads 加载）
          input: {
            index: resolve('src/main/index.ts'),
            'lxSandbox.worker': resolve('src/main/modules/lxSandbox/worker.ts')
          }
        }
      }
    },
    preload: {},
    renderer: {
      resolve: {
        alias: {
          '@': resolve('src/renderer'),
          '@renderer': resolve('src/renderer'),
          '@i18n': resolve('src/i18n')
        }
      },
      // 生产构建移除 console/debugger，减小体积并避免泄露调试信息（dev 保留以便调试）
      esbuild: isBuild ? { drop: ['console', 'debugger'] } : undefined,
      build: {
        rollupOptions: {
          output: {
            // 手动分包：将重型第三方库拆出主 chunk，加快首屏与增量更新
            manualChunks(id: string) {
              if (!id.includes('node_modules')) return;
              if (id.includes('naive-ui')) return 'naive-ui';
              if (
                id.includes('node_modules/vue/') ||
                id.includes('vue-router') ||
                id.includes('vue-i18n') ||
                id.includes('/pinia') ||
                id.includes('@vueuse')
              ) {
                return 'vue-vendor';
              }
              if (id.includes('howler')) return 'howler';
              if (id.includes('crypto-js') || id.includes('jsencrypt')) return 'crypto';
              if (id.includes('marked')) return 'marked';
              return 'vendor';
            }
          }
        }
      },
      plugins: [
        vue(),
        viteCompression(),
        // VueDevTools 仅在开发期注入，避免调试代码进入生产包
        ...(isBuild ? [] : [VueDevTools()]),
        AutoImport({
          imports: [
            'vue',
            {
              'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
            }
          ]
        }),
        Components({
          resolvers: [NaiveUiResolver()]
        })
      ],
      publicDir: resolve('resources'),
      server: {
        host: '0.0.0.0',
        port: 2389
      }
    }
  };
});
