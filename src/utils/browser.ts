import type { SiteLanguage } from '@/types/setting'

export function getBrowserLangcode(): SiteLanguage {
  const lang = navigator.language.toLowerCase()

  if (lang.includes('zh')) {
    return 'zh_CN'
  } else {
    return 'en_US'
  }
}
