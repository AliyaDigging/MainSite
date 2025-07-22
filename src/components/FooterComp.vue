<script setup lang="ts">
const currYear = new Date().getFullYear()
</script>

<template>
  <footer class="mt-4 p-6">
    <div style="text-align: right">
      <p class="mt-8 lg:mt-0 mb-1">
        Copyright&nbsp;&copy;&nbsp;<span class="font-bold">ALIYA&nbsp;DB</span>&nbsp;2025-{{
          currYear + 1000
        }}
      </p>
      <p class="mb-1"><span>All rights reserved.</span></p>
    </div>
    <br />
    <div style="text-align: center">
      <p class="mb-1">{{ $t('comp.footer.p.1') }}</p>
      <p class="mb-1">
        ALIYA DB doesn't own any in-game content; all of them belongs to their respective copyright
        owners.
      </p>
      <p class="mb-1">
        ALIYA DB is a <i><b>NON-PROFIT</b> FAN PROJECT</i> dedicated to the game
        <a href="https://store.steampowered.com/app/2704110/Aliya_Timelink/" target="_blank">
          Aliya: Timelink</a
        >.
      </p>
      <p>
        For more information about this project, refer to
        <router-link to="/about">About Page</router-link>.
      </p>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #1e1e1e;
  width: 100%;
}

* {
  color: var(--p-surface-500);
}
</style>
