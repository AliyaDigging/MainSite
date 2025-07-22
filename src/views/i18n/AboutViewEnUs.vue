<script setup lang="ts">
import PvDivider from 'primevue/divider'
</script>

<template>
  <div class="view-body-padding-20">
    <h1 class="view-page-h1 text-black mb-0">About this site</h1>
    <p class="view-page-h1-desc text-color mb-2" style="font-size: 1.2em">
      Something about this site and this project
    </p>
    <PvDivider />
    <h2>DISCLAIMER</h2>
    <p class="text-color mt-2">
      ALIYA DB has <b>no relations</b> with neither the game <i>Aliya: Timelink</i>, nor the
      developer <i>TDGame Studio</i> (<a
        href="https://store.steampowered.com/developer/tdgame"
        target="_blank"
        >Steam page</a
      >) or the publisher <i>AnotherIndie</i> (<a href="http://anotherindie.com.cn/" target="_blank"
        >official site (in Chinese)</a
      >,
      <a href="https://store.steampowered.com/publisher/AnotherIndie/" target="_blank">Steam page</a
      >).
    </p>
    <p class="text-color mt-2">
      All the in-game assets, referenced/used by ALIYA DB, are all owned by their respective
      copyright holders. ALIYA DB only uses them for data display/showcase purposes.
    </p>
    <p class="text-color mt-2">ALIYA DB is a NON-PROFIT FAN PROJECT/WEBSITE.</p>
    <h2 class="mt-4">Technologies</h2>
    <p class="mt-2">
      ALIYA DB use
      <a href="https://github.com/AssetRipper/AssetRipper" target="_blank">AssetRipper</a> to
      extract game data manually.
    </p>
    <p class="mt-2">
      ALIYA DB use <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a> to
      empower data processing precedure.
    </p>
    <p class="mt-2">
      ALIYA DB use <a href="https://vuejs.org/" target="_blank">Vue 3</a> as the framework,
      <a href="https://primevue.org/">PrimeVue</a> as the UI library and
      <a href="https://vueflow.dev/">Vue Flow</a> for flowchart visualization in the front-end part.
    </p>
    <p class="mt-2">
      ALIYA DB also uses
      <a href="https://hyperos.mi.com/font/zh/details/sc/">MiSans VF (Variable Font)</a> as the main
      font, and utilizes
      <a href="https://chinese-font.netlify.app/zh-cn/">Chinese Web Font Project (中文网字计划)</a
      >'s splitter to pre-split the fonts. According to
      <a href="https://hyperos.mi.com/font-download/MiSans字体知识产权许可协议.pdf"
        >MiSans' license</a
      >, ALIYA DB is eligible to use this font for free.
    </p>
    <p class="mt-2">
      ALIYA DB uses
      <a href="https://pages.cloudflare.com/">CloudFlare Pages</a>
      to generate and deploy the website, and uses
      <a href="https://aws.amazon.com/cloudfront/">AWS CloudFront</a> for global CDN and access
      acceleration.
    </p>
    <p class="mt-2">
      To learn more, refer to the
      <a
        href="https://github.com/AliyaDigging/.github/blob/main/TECHNICAL_EXPLANATION.md"
        target="_blank"
        >Technical Explanation document</a
      >
      on GitHub.
    </p>
    <h2 class="mt-4">Services</h2>
    <p class="mt-2">
      ALIYA DB does not collect any data, but we do use third-party services to collect anonymous
      data for analysis.
    </p>
    <p class="mt-2">
      ALIYA DB use <a href="https://developers.google.com/analytics">Google Analytics</a> to analyze
      website traffic.
    </p>
    <p class="mt-2">
      ALIYA DB use <a href="https://clarity.microsoft.com/">Microsoft Clarity</a> to analyze user
      behavior and locate potential bugs.
    </p>
    <h2 class="mt-4">Contact</h2>
    <ul class="custom-node-normal-ul mt-2">
      <li>GitHub - <a href="https://github.com/sctop">@sctop</a></li>
      <li>GitHub Organization - <a href="https://github.com/AliyaDigging">AliyaDigging</a></li>
    </ul>
  </div>
</template>
