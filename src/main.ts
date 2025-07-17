import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'

// PrimeVue
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import PvTooltip from 'primevue/tooltip'
import PvDialogService from 'primevue/dialogservice'
import { definePreset } from '@primevue/themes'

// Pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// I18n
import { createI18n } from 'vue-i18n'
import i18n_zh_CN from '@/i18n/zh_CN.json'
import i18n_en_US from '@/i18n/en_US.json'
import i18n_zh_TW from '@/i18n/zh_TW.json'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const i18n = createI18n({
  allowComposition: true,
  locale: 'zh_CN',
  fallbackLng: 'en_US',
  messages: {
    zh_CN: i18n_zh_CN,
    zh_TW: i18n_zh_TW,
    en_US: i18n_en_US,
  },
})

const AuraCustomPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
  },
})

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(i18n)
app.use(PrimeVue, {
  theme: {
    preset: AuraCustomPreset,
    options: {
      prefix: 'p',
      darkModeSelector: '.p-dark',
      cssLayer: false,
    },
  },
})
app.use(PvDialogService)
app.directive('tooltip', PvTooltip)

app.mount('#app')
