import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { L10nLanguage, SiteLanguage } from '@/types/setting'
import { getBrowserLangcode } from '@/utils/browser'

export const useSiteSettingStore = defineStore(
  'SiteSetting',
  () => {
    const sitelang = ref<SiteLanguage>(getBrowserLangcode())
    const l10nlang = ref<L10nLanguage>('zh-cn')

    const l10nLangRows = ref<number>(5)

    const persist = ref(true)
    function refreshPersist() {
      persist.value = !persist.value
    }

    function changeSiteLang(value: SiteLanguage | undefined = undefined) {
      if (value) {
        sitelang.value = value
      }
      document.documentElement.lang = sitelang.value
    }

    return { sitelang, l10nlang, l10nLangRows, refreshPersist, changeSiteLang }
  },
  { persist: true },
)
