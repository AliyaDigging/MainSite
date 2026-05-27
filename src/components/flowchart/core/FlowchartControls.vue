<script setup lang="ts">
/**
 * 流程图控制按钮组件
 * 提供锁定/解锁、小地图切换、重新布局等控制功能
 */
import { Controls, ControlButton } from '@vue-flow/controls'
import { useI18n } from 'vue-i18n'

defineProps<{
  isDraggable: boolean
  isShowMiniMap: boolean
}>()

const emit = defineEmits<{
  'update:isDraggable': [value: boolean]
  'update:isShowMiniMap': [value: boolean]
  relayout: []
  toggleSearch: []
}>()

const i18n = useI18n()
</script>

<template>
  <Controls position="top-left">
    <template #control-interactive>
      <ControlButton
        class="vue-flow__controls-interactive"
        @click="emit('update:isDraggable', !isDraggable)"
      >
        <div v-if="isDraggable" name="icon-unlock">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32">
            <path
              d="M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0c-4.114 1.828-1.37 2.133.305 2.438 1.676.305 4.42 2.59 4.42 5.181v3.048H3.047A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047z"
            />
          </svg>
        </div>
        <div v-if="!isDraggable" name="icon-lock">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 32">
            <path
              d="M21.333 10.667H19.81V7.619C19.81 3.429 16.38 0 12.19 0 8 0 4.571 3.429 4.571 7.619v3.048H3.048A3.056 3.056 0 000 13.714v15.238A3.056 3.056 0 003.048 32h18.285a3.056 3.056 0 003.048-3.048V13.714a3.056 3.056 0 00-3.048-3.047zM12.19 24.533a3.056 3.056 0 01-3.047-3.047 3.056 3.056 0 013.047-3.048 3.056 3.056 0 013.048 3.048 3.056 3.056 0 01-3.048 3.047zm4.724-13.866H7.467V7.619c0-2.59 2.133-4.724 4.723-4.724 2.591 0 4.724 2.133 4.724 4.724v3.048z"
            />
          </svg>
        </div>
      </ControlButton>
    </template>
    <ControlButton
      @click="emit('toggleSearch')"
      :title="i18n.t('comp.flowchart.control.search')"
      v-tooltip.right="i18n.t('comp.flowchart.control.search')"
    >
      <div style="color: black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
        >
          <path
            d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0c.41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </ControlButton>
    <ControlButton
      @click="emit('update:isShowMiniMap', !isShowMiniMap)"
      :title="i18n.t('comp.flowchart.control.minimap')"
      v-tooltip.right="i18n.t('comp.flowchart.control.minimap')"
    >
      <div style="color: black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
          v-if="isShowMiniMap"
        >
          <path
            d="M20.5 3l-.16.03L15 5.1L9 3L3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1l5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"
            fill="currentColor"
          ></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
          v-else
        >
          <path
            d="M20.5 3l-.16.03L15 5.1L9 3L3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1l5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM10 5.47l4 1.4v11.66l-4-1.4V5.47zm-5 .99l3-1.01v11.7l-3 1.16V6.46zm14 11.08l-3 1.01V6.86l3-1.16v11.84z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </ControlButton>
    <ControlButton
      @click="emit('relayout')"
      :title="i18n.t('comp.flowchart.control.relayout')"
      v-tooltip.right="i18n.t('comp.flowchart.control.relayout')"
    >
      <div style="color: black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 24 24"
        >
          <g
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="4" y="4" width="6" height="5" rx="2"></rect>
            <rect x="4" y="13" width="6" height="7" rx="2"></rect>
            <rect x="14" y="4" width="6" height="16" rx="2"></rect>
          </g>
        </svg>
      </div>
    </ControlButton>
  </Controls>
</template>
