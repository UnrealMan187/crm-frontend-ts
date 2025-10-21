import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'

import App from './App.vue'

// ⬇️ i18n einbinden
import { createI18n } from 'vue-i18n'
import de from './locales/de.json'
import en from './locales/en.json'

const i18n = createI18n({
  legacy: false,
  locale: 'de',
  fallbackLocale: 'en',
  messages: { de, en }
})

createApp(App)
  .use(createPinia())
  .use(router)
  .use(i18n) // ⬅️ wichtig
  .mount('#app')
