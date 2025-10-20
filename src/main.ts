import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import './style.css';
import App from './App.vue';

import { createI18n } from 'vue-i18n';
import de from './locales/de.json';
import en from './locales/en.json';

const savedLocale = localStorage.getItem('locale');
const browserLocale = navigator.language?.startsWith('de') ? 'de' : 'en';
const locale = (savedLocale === 'de' || savedLocale === 'en') ? savedLocale : browserLocale;

const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'en',
  messages: { de, en }
});

createApp(App)
  .use(createPinia())
  .use(router)
  .use(i18n)
  .mount('#app');
