import type { SiteLanguage } from '@/types/setting'

const regexUAMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

export function getBrowserLangcode(): SiteLanguage {
  const lang = navigator.language.toLowerCase()

  if (lang.includes('zh')) {
    return 'zh_CN'
  } else {
    return 'en_US'
  }
}

export function detectIsMobile() {
  const result = regexUAMobile.test(navigator.userAgent)
  return result
}
