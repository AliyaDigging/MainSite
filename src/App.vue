<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavMenu from '@/components/NavMenu.vue'
import FooterComp from './components/FooterComp.vue'

import DynamicDialog from 'primevue/dynamicdialog'
import Message from 'primevue/message'
import { useSiteSettingStore } from './stores/setting'
import { watch, inject, computed, ref } from 'vue'

import { symbolUseDark } from '@/constants/injection'
import { Button } from 'primevue'

const setting = useSiteSettingStore()

const isDark = inject(symbolUseDark)!
const cssCodeBgColor = computed(() => (isDark.value ? '#4a1c1f' : '#fff5f5'))
const cssCodeTextColor = computed(() => (isDark.value ? '#ff6b6b' : '#dc3545'))

const shouldDisplayWarning = ref(
  (() => {
    const temp = localStorage.getItem('top-view-warning-1')
    if (!temp && temp !== 'closed') return true
    return false
  })(),
)
function setWarningCloseState() {
  localStorage.setItem('top-view-warning-1', 'closed')
  shouldDisplayWarning.value = false
}
function doAlert(content: string) {
  alert(content)
}

watch(
  () => setting.sitelang,
  () => setting.changeSiteLang(),
)
</script>

<template>
  <div>
    <DynamicDialog />
    <Message
      severity="warn"
      icon="pi pi-exclamation-triangle"
      style="text-align: left"
      v-if="shouldDisplayWarning"
    >
      <div style="margin-left: 4px">
        <p style="font-size: 1.5rem; font-weight: bold">{{ $t('view.global.warning.1.title') }}</p>
        <p v-html="$t('view.global.warning.1.p.1')"></p>
        <p v-html="$t('view.global.warning.1.p.2')"></p>
        <p v-html="$t('view.global.warning.1.p.3')"></p>
        <div class="mt-2">
          <Button @click="setWarningCloseState" severity="success">{{
            $t('view.global.warning.1.btn.1')
          }}</Button
          >&emsp;<Button
            @click="doAlert($t(`view.global.warning.1.btn.2.alert`))"
            severity="danger"
            >{{ $t('view.global.warning.1.btn.2') }}</Button
          >
        </div>
      </div>
    </Message>

    <div style="position: sticky; top: 0; width: 100%; z-index: 10">
      <NavMenu />
    </div>
    <div style="">
      <RouterView />
    </div>
    <FooterComp />
  </div>
</template>

<style>
code {
  font-family: 'Noto Sans Mono', monospace !important;
  background-color: v-bind(cssCodeBgColor);
  padding: 2px 4px;
  border-radius: 4px;
  color: v-bind(cssCodeTextColor);
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.8em;
}

/** 这下面的代码好像不起效果，但为了防止bug还是保留了 */
:deep(code) {
  font-family: 'Noto Sans Mono', monospace !important;
  background-color: v-bind(cssCodeBgColor);
  padding: 2px 4px;
  border-radius: 4px;
  color: v-bind(cssCodeTextColor);
  white-space: pre-wrap;
  word-wrap: break-word;

  margin-top: 2px;
  display: inline;
  line-height: 1.8em;
}
</style>
