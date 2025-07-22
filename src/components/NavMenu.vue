<script setup lang="ts">
import PvMenubar from 'primevue/menubar'
import PvButton from 'primevue/button'
import { navItems } from '@/constants/navbar'
import { defineAsyncComponent, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDialog } from 'primevue/usedialog'
import { symbolUseDark } from '@/constants/injection'
import { useToggle } from '@vueuse/core'

const settingComponent = defineAsyncComponent(() => import('./SettingComp.vue'))

const i18n = useI18n()

const isDark = inject(symbolUseDark)!
const isDarkToggle = useToggle(isDark)

const dialog = useDialog()
function openSetting() {
  dialog.open(settingComponent, {
    props: {
      header: i18n.t('comp.setting.dialog.header'),
      style: {
        width: '90vw',
      },
      modal: true,
      draggable: false,
      dismissableMask: true,
    },
  })
}
</script>

<template>
  <PvMenubar :model="navItems">
    <template #start>
      <span style="font-weight: 600">Aliya DB</span>
    </template>
    <template #item="{ item, props, hasSubmenu }">
      <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span>{{ $t(String(item.label)) }}</span>
        </a>
      </RouterLink>
      <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
        <span :class="item.icon" />
        <span>{{ $t(String(item.label)) }}</span>
        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
      </a>
    </template>
    <template #end>
      <PvButton severity="secondary" @click="isDarkToggle()" class="mr-4">
        <i class="pi pi-sun" v-if="!isDark"></i>
        <i class="pi pi-moon" v-else></i>
      </PvButton>
      <PvButton severity="secondary" @click="openSetting()">
        <i class="pi pi-cog"></i>
      </PvButton>
    </template>
  </PvMenubar>
</template>
