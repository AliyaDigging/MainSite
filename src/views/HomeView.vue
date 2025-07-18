<script setup lang="ts">
import PvCard from 'primevue/card'
import SpolierContent from '@/components/SpolierContent.vue'
</script>

<template>
  <div class="home-hero-image">
    <div class="home-hero-text">
      <h1 class="m-0">ALIYA DB</h1>
      <p class="m-0">A fan project dedicated to the game Aliya: Timelink.</p>
    </div>
  </div>
  <div class="home-other-panel view-body-padding-20">
    <h2 class="h2-title m-0 text-black mt-3">试图从游戏里挖出点什么东西</h2>
    <p class="h2-desc text-color m-0 mb-4">我们</p>
    <div class="home-feature-card-div">
      <PvCard>
        <template #title>ℹ️ 全故事流程图</template>
        <template #subtitle>一目不了然</template>
        <template #content
          >基于对 Fungus Block 和 自定义命令 的反向研究， Aliya DB
          实现了在游戏外完整解析游戏内故事流程图，并将其可视化显示在网站上。</template
        >
      </PvCard>
      <PvCard>
        <template #title>🌐 本地化文本查询</template>
        <template #subtitle>对话、选项、结局</template>
        <template #content
          >基于 CSV 或 JSON 的本地化文本查询，同时支持 Google
          翻译将文本实时翻译到其它语言。</template
        >
      </PvCard>
      <PvCard>
        <template #title>❓ 还有更多等待开发……</template>
        <template #subtitle>大概吧，在不被送律师函的情况下</template>
        <template #content
          >我实在不知道第三点应该写什么，因为最一开始只是想写一个对流程图的解析而已。<br />但是我又觉得排版时不排上三个卡片似乎又不好，所以这一个纯粹是凑数的——说实话，我也不知道还有什么是值得去二次开发的，除了我感兴趣的流程图外。</template
        >
      </PvCard>
    </div>
    <p class="mt-4">
      *全部数据及代码开源在GitHub上。请阅读<RouterLink to="/about/technical">技术声明</RouterLink
      >了解更多信息。
    </p>
  </div>
  <div class="home-other-panel view-body-padding-20 mt-8">
    <h2 class="h2-title text-black">为什么做这个</h2>
    <h2 class="h2-title" style="margin-top: 0; font-size: 30px">
      <SpolierContent><del>因为无聊而且喜欢 Aliya</del></SpolierContent>
    </h2>
    <br />
    <p class="h2-desc h2-desc-long text-color">
      我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们我们<SpolierContent
        >你好世界</SpolierContent
      >
    </p>
    <br />
  </div>
  <br />
</template>

<style scoped>
.home-hero-image {
  width: 100%;
  height: 70vh;
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/aliya/steam_library_hero_2x.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.home-hero-text {
  text-align: center;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white !important;
  padding: 20px;
}

.home-feature-card-div {
  justify-items: center;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;

  padding-left: 10px;
  padding-right: 10px;
}

/* 针对字体的调优 */
.home-hero-text h1 {
  font-size: 80px;
  font-weight: 900;
}

.home-hero-text p {
  font-size: 20px;
  font-weight: 400;
}

.h2-title {
  font-size: 50px;
  text-align: center;
  font-weight: 600;
}

.h2-desc {
  text-align: center;
  /*color: var(--p-surface-500); /* from .text-surface-500 */
}

.h2-desc-long {
  text-align: left;
  text-indent: 2em;
  /*color: black;*/
}

@media screen and (max-width: 960px) {
  .home-hero-text h1 {
    font-size: 80px;
  }

  .home-feature-card-div {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 794px) {
  .home-hero-text h1 {
    font-size: 60px;
  }

  .h2-title {
    font-size: 40px;
  }

  .home-feature-card-div {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media screen and (max-width: 370px) {
  .home-hero-text h1 {
    font-size: 45px;
  }
}
</style>
