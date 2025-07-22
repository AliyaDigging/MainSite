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

/** by Grok 3 */
export function triggerDownloadEvent(url: string, filename: string) {
  const fileUrl = url
  const fileName = filename

  const link = document.createElement('a')
  link.href = fileUrl
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
