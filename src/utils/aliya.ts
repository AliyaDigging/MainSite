import { L10nLanguage } from '@/types/setting'

/**
 * @description FOR ALIYA MESSAGE
 */
export function caluateMessageTypingTime(
  text: string,
  lang: L10nLanguage,
): { time: number; calcString: string } {
  switch (lang) {
    case 'zh-cn':
    case 'zh-cn-c':
      return { time: 0.6 + text.length * 0.2, calcString: `0.6s + ${text.length} * 0.2s` }
    case 'en-us':
      return { time: 0.6 + text.length * 0.066, calcString: `0.6s + ${text.length} * 0.066s` }
  }
}

/**
 * @description unknown purpose
 */
export function GetReadWait(
  text: string,
  lang: L10nLanguage,
): { time: number; calcString: string } {
  switch (lang) {
    case 'zh-cn':
    case 'zh-cn-c':
      return { time: 0.6 + text.length * 0.1, calcString: `0.6s + ${text.length} * 0.1s` }
    case 'en-us':
      return { time: 0.6 + text.length * 0.033, calcString: `0.6s + ${text.length} * 0.033s` }
  }
}
