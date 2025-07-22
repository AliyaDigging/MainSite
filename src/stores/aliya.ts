import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAliyaStore = defineStore(
  'AliyaStore',
  () => {
    const playerName = ref<string>('ALIYA DB')
    const showFormattedString = ref(true)

    const stringPlayerName = playerName
    const stringYear = ref(new Date().getFullYear())
    const stringAliyaYear = ref(new Date().getFullYear() + 1000)
    // 感谢大佬 https://steamcommunity.com/sharedfiles/filedetails/?id=3288314856 做的参考图
    const stringFatherYear = ref(new Date().getFullYear() + 974)

    const persistToggler = ref(false)

    function updateFormattedTable() {
      stringYear.value = new Date().getFullYear()
      stringAliyaYear.value = new Date().getFullYear() + 1000
      stringFatherYear.value = new Date().getFullYear() + 974
    }

    function getTableForReplace() {
      return {
        '{$name}': stringPlayerName.value,
        '${year}': String(stringYear.value),
        '${aliyaYear}': String(stringAliyaYear.value),
        '${fatherYear}': String(stringFatherYear.value),
      }
    }

    function makePersist() {
      persistToggler.value = !persistToggler.value
    }

    return {
      playerName,
      showFormattedString,
      updateFormattedTable,
      getTableForReplace,
      makePersist,
    }
  },
  { persist: true },
)
