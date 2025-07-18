import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'

// PrimeVue
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import PvTooltip from 'primevue/tooltip'
import PvDialogService from 'primevue/dialogservice'
import { definePreset } from '@primevue/themes'
import { Ripple } from 'primevue'

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
      50: '#f5f9ff',
      100: '#d0e1fd',
      200: '#abc9fb',
      300: '#85b2f9',
      400: '#609af8',
      500: '#3b82f6',
      600: '#326fd1',
      700: '#295bac',
      800: '#204887',
      900: '#183462',
      950: '#0f213e',
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
  ripple: true,
})
app.use(PvDialogService)
app.directive('tooltip', PvTooltip)
app.directive('ripple', Ripple)

app.mount('#app')
