<script setup lang="ts">
import { useCssVar } from '@vueuse/core'
import { useDialog } from 'primevue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import TooltipAndPopupDialog from './TooltipAndPopupDialog.vue'

const props = defineProps({
  showUnderline: {
    type: Boolean,
    default: true,
  },
  mimicAnchorColor: {
    type: Boolean,
    default: true,
  },
  canHover: {
    type: Boolean,
    default: true,
  },
  canClick: {
    type: Boolean,
    default: true,
  },
  content: {
    type: String,
    required: true,
  },
})

// base CSS colors
const color500 = useCssVar('--p-primary-500')
const color600 = useCssVar('--p-primary-600')
// actual CSS text color
const textColor = computed(() => (props.mimicAnchorColor ? color500.value : 'inherit'))
const textColorHover = computed(() => () => (props.mimicAnchorColor ? color600.value : 'inherit'))

const dialog = useDialog()
function openPopup() {
  dialog.open(TooltipAndPopupDialog, {
    props: {
      style: {
        maxWidth: '90vw',
      },
      modal: true,
      draggable: false,
      dismissableMask: true,
    },
    data: {
      content: props.content,
    },
  })
}
</script>

<template>
  <template v-if="canHover && !canClick">
    <span v-tooltip.top="props.content"><slot></slot></span>
  </template>
  <template v-else-if="!canHover && canClick">
    <span style="cursor: pointer" @click="openPopup()"><slot></slot></span>
  </template>
  <template v-else>
    <span v-tooltip.top="props.content" style="cursor: pointer" @click="openPopup()"
      ><slot></slot
    ></span>
  </template>
</template>

<style scoped>
span {
  color: v-bind(textColor);
}
span:hover {
  color: v-bind(textColorHover);
}
</style>
