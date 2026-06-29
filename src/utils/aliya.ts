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
  return { time: -1, calcString: `ERROR` }
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
  return { time: -1, calcString: `ERROR` }
}

export function batchReplaceString(targetString: string, replaceTable: Record<string, string>) {
  let text = targetString
  Object.entries(replaceTable).forEach(([name, value]) => {
    const regex = new RegExp(`${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi')
    text = text.replace(regex, value)
  })

  return text
}

/**
 * @description FOR ALIYA2_DEMO — 消息等待时间计算（对应 C# Formula 类）
 *
 * 逐字符按 Unicode 区间自动判定语言（中文 / 英文 / 中性），
 * 将文本切分为语言片段后按各语言的每字符系数累加等待时间。
 *
 * 语言判定规则：
 * - 中文区间：CJK 统一表意文字 (0x4E00–0x9FFF) | 扩展A (0x3400–0x4DBF) | 兼容区 (0xF900–0xFAFF)
 * - 英文区间：大写 A–Z (0x41–0x5A) | 小写 a–z (0x61–0x7A)
 * - 中性字符（标点、符号、空格、其他语言文字等）：继承前段语言，首字符无前段时归为 Other（速率同中文）
 *
 * 速率常量：
 * - 中文 / Other：消息 0.2s/字符，阅读 0.1s/字符
 * - 英文：         消息 0.066s/字符，阅读 0.033s/字符
 */
export class Aliya2Demo_Utils {
  // ---- Unicode 区间判定 ----

  private static isChinese(ch: string): boolean {
    const code = ch.codePointAt(0)!
    return (
      (code >= 0x4e00 && code <= 0x9fff) || // CJK 统一表意文字
      (code >= 0x3400 && code <= 0x4dbf) || // CJK 扩展 A
      (code >= 0xf900 && code <= 0xfaff) // CJK 兼容表意文字
    )
  }

  private static isEnglish(ch: string): boolean {
    const code = ch.codePointAt(0)!
    return (
      (code >= 0x41 && code <= 0x5a) || // A–Z
      (code >= 0x61 && code <= 0x7a) // a–z
    )
  }

  private static resolveLanguage(ch: string): 'zh' | 'en' | 'neutral' {
    if (Aliya2Demo_Utils.isChinese(ch)) return 'zh'
    if (Aliya2Demo_Utils.isEnglish(ch)) return 'en'
    return 'neutral'
  }

  // ---- 核心计算 ----

  private static calcWaitTime(
    text: string,
    baseSeconds: number,
    secondsPerZhChar: number,
    secondsPerEnChar: number,
  ): number {
    if (!text) return baseSeconds
    if (text.includes('$image') || text.includes('$emoji')) return baseSeconds

    let total = baseSeconds
    let currLang: 'zh' | 'en' | 'other' = 'other'
    let segLen = 0
    let hasFirstNonNeutral = false

    for (const ch of text) {
      let lang: 'zh' | 'en' | 'neutral' | 'other' = Aliya2Demo_Utils.resolveLanguage(ch)

      // 中性字符：继承前段语言；若尚无前段（文本开头），归为 other
      if (lang === 'neutral') {
        lang = hasFirstNonNeutral ? currLang : 'other'
      } else {
        hasFirstNonNeutral = true
      }

      // 语言变更 → 结算上一段
      if (segLen > 0 && lang !== currLang) {
        total += segLen * (currLang === 'en' ? secondsPerEnChar : secondsPerZhChar)
        segLen = 0
      }

      currLang = lang as 'zh' | 'en' | 'other'
      segLen++
    }

    // 结算最后一段
    if (segLen > 0) {
      total += segLen * (currLang === 'en' ? secondsPerEnChar : secondsPerZhChar)
    }

    return total
  }

  // ---- 公开 API ----

  /**
   * 计算消息发送等待时间（对应 C# Formula.GetMessageWait）
   * @param text 消息文本。空文本返回基础时间 0.6s
   */
  static getTextSendWaitTime(text: string): number {
    return Aliya2Demo_Utils.calcWaitTime(text, 0.6, 0.2, 0.066)
  }

  /**
   * 计算消息阅读等待时间（对应 C# Formula.GetReadWait）
   * @param text 消息文本。空文本返回基础时间 0.2s
   */
  static getTextReadWaitTime(text: string): number {
    return Aliya2Demo_Utils.calcWaitTime(text, 0.2, 0.1, 0.033)
  }
}
