import './index.css';
import '@/assets/css/design-tokens.css';
import '@/assets/css/mobile.css';
import 'animate.css';
// 仅引用 woff2 子集（Electron/Chromium 完整支持），避免 vite 把 svg/eot/ttf/woff 全量打入产物（省 ~4.4MB）
import '@/assets/fonts/remixicon.css';

import { createApp } from 'vue';

import i18n from '@/../i18n/renderer';
import router from '@/router';
import pinia from '@/store';

import App from './App.vue';
import directives from './directive';

const app = createApp(App);

Object.keys(directives).forEach((key: string) => {
  app.directive(key, directives[key as keyof typeof directives]);
});

app.use(pinia);
app.use(router);
app.use(i18n as any);
app.mount('#app');
