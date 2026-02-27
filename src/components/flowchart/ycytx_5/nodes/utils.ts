import TooltipAndPopup from '@/components/TooltipAndPopup.vue'
import { h } from 'vue'

export function createComponentWithLinks(str: string, dictData: Record<string, [string, string]>) {
  const dictMap = new Map<string, string>()
  Object.values(dictData).forEach((v) => dictMap.set(v[0], v[1]))

  type MixedComp = ReturnType<typeof h> | string
  let temp: Array<MixedComp> = [str]

  // i = 要split的关键词
  for (const i of dictMap.keys()) {
    // temp2 = 新 Array
    const temp2: Array<MixedComp> = []
    // j = 既有的组合
    for (const j of temp) {
      // 如果是字符串，尝试关键词split
      if (typeof j === 'string') {
        // temp3 - split结果
        const temp3 = j.split(i)

        // 如果为1，则无关键词
        if (temp3.length === 1) {
          temp2.push(j)
        } else {
          // 否则，就是有
          for (const k of temp3) {
            // 跳过空字符串
            if (k.length !== 0) {
              temp2.push(h('span', { innerHTML: k }))
            }
            temp2.push(h(TooltipAndPopup, { content: dictMap.get(i)! }, () => i))
          }
          temp2.pop()
        }
      } else {
        temp2.push(j)
      }
    }

    temp = temp2
  }

  // 接下来，将所有字符串替换为 span 元素
  const temp2: Array<ReturnType<typeof h>> = []
  for (const i of temp) {
    if (typeof i === 'string') {
      temp2.push(h('span', { innerHTML: i }))
    } else {
      temp2.push(i)
    }
  }

  return h('span', temp2)
}
