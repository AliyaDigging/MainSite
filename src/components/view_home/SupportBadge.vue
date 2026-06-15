<script setup lang="ts">
import PvBadge from 'primevue/badge'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

type SupportLevel = 'plat' | 'gold' | 'bronze' | 'dropped'

const props = defineProps<{
  level: SupportLevel
}>()

const i18n = useI18n()

const COLOR_MAP: Record<SupportLevel, string> = {
  plat: '#B4C7DC',
  gold: '#CFB53B',
  bronze: '#CD7F32',
  dropped: 'red',
}

const badgeText = computed(() => i18n.t(`view.home.4.card.support.tag.${props.level}`))

const tooltipText = computed(() => {
  if (props.level === 'dropped') return undefined
  return i18n.t(`view.home.4.card.support.tag.${props.level}.tip`)
})
</script>

<template>
  <PvBadge
    :value="badgeText"
    :style="{ backgroundColor: COLOR_MAP[props.level], color: 'black' }"
    v-tooltip.top="tooltipText"
  />
</template>
