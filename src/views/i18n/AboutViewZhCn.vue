<script setup lang="ts">
import PvDivider from 'primevue/divider'
</script>

<template>
  <div class="view-body-padding-20">
    <h1 class="view-page-h1 text-black mb-0">关于本网站</h1>
    <p class="view-page-h1-desc text-color mb-2" style="font-size: 1.2em">
      一点关于这个网站和项目的小信息
    </p>
    <PvDivider />
    <h2>免责声明</h2>
    <p class="text-color mt-2">
      本站与游戏《彼方的她-Aliya》（Aliya: Timelink）、开发者【瞳电游工作室】（<a
        href="https://space.bilibili.com/1104337773"
        target="_blank"
        >B站官号</a
      >、<a href="https://store.steampowered.com/developer/tdgame" target="_blank">Steam</a
      >）与发行商【AnotherIndie】（<a href="http://anotherindie.com.cn/" target="_blank">官网</a
      >、<a href="https://store.steampowered.com/publisher/AnotherIndie/" target="_blank">Steam</a
      >）无任何关系。
    </p>
    <p class="text-color mt-2">
      本站中引用的所有游戏内素材均属于其各自版权所有者，本站仅做相关数据展示。
    </p>
    <p class="text-color mt-2">本站为非盈利性质的粉丝向网站。</p>
    <h2 class="mt-4">使用的技术</h2>
    <p class="mt-2">
      游戏数据获取使用
      <a href="https://github.com/AssetRipper/AssetRipper" target="_blank">AssetRipper</a>
      人工处理。
    </p>
    <p class="mt-2">
      数据处理部分使用
      <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a> 驱动（因为我馋 TS
      的类型检查）。
    </p>
    <p class="mt-2">
      前端展示部分使用了 <a href="https://vuejs.org/" target="_blank">Vue 3</a> 作为底层框架、<a
        href="https://primevue.org/"
        >PrimeVue</a
      >
      作为 UI 显示库，以及 <a href="https://vueflow.dev/">Vue Flow</a> 作为流程图可视化库。
    </p>
    <p class="mt-2">
      欲了解更多内容，请参阅 GitHub 上的<a
        href="https://github.com/AliyaDigging/.github/blob/main/TECHNICAL_EXPLANATION.md"
        target="_blank"
        >技术说明文档</a
      >。
    </p>
    <h2 class="mt-4">使用的服务</h2>
    <p class="mt-2">本站不收集任何数据，但本站的确使用第三方服务收集匿名数据以供分析。</p>
    <p class="mt-2">
      本站使用 <a href="https://developers.google.com/analytics">Google Analytics</a> 分析网站流量。
    </p>
    <p class="mt-2">
      本站使用
      <a href="https://clarity.microsoft.com/">Microsoft Clarity</a> 分析用户行为及定位潜在问题。
    </p>
    <h2 class="mt-4">联系方式</h2>
    <ul class="custom-node-normal-ul mt-2">
      <li>GitHub - <a href="https://github.com/sctop">@sctop</a></li>
      <li>GitHub Organization - <a href="https://github.com/AliyaDigging">AliyaDigging</a></li>
      <li>B站 - <a href="https://space.bilibili.com/93650528">童年是个风筝</a></li>
    </ul>
  </div>
</template>
