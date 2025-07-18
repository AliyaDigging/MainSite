<script setup lang="ts">
import PvMenubar from 'primevue/menubar'
import PvButton from 'primevue/button'
import { navItems } from '@/constants/navbar'
</script>

<template>
  <PvMenubar :model="navItems">
    <template #start>
      <span>Aliya DB</span>
    </template>
    <template #item="{ item, props, hasSubmenu }">
      <RouterLink v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
        </a>
      </RouterLink>
      <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
        <span :class="item.icon" />
        <span>{{ item.label }}</span>
        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
      </a>
    </template>
    <template #end> </template>
  </PvMenubar>
</template>
