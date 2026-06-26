<script setup lang="ts">
import PvCard from 'primevue/card'
import SpolierContent from '@/components/SpolierContent.vue'
import { useI18n } from 'vue-i18n'
import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'
import SupportBadge from '@/components/view_home/SupportBadge.vue'

const i18n = useI18n()
const windowsize = useWindowSize()

const cssWidthIframe = computed(() => `${windowsize.width.value - 48}px`)
</script>

<template>
  <div class="home-hero-image">
    <div class="home-hero-text">
      <h1 class="m-0" v-if="i18n.locale.value === 'zh_CN'">
        <ruby>彼方档案馆<rp>(</rp><rt>ALIYA DB</rt><rp>)</rp></ruby
        ><!--<span class="rainbow-animated">+</span>-->
      </h1>
      <h1 class="m-0" v-else>ALIYA DB<!--<span class="rainbow-animated">+</span>--></h1>
      <p class="m-0">{{ $t('view.home.hero.p') }}</p>
    </div>
  </div>

  <div class="home-other-panel view-body-padding-20">
    <h2 class="h2-title m-0 text-black mt-3">{{ $t('view.home.h2.4') }}</h2>
    <p class="h2-desc text-color m-0 mb-4" v-html="$t('view.home.4.1')"></p>
    <div class="home-feature-card-div">
      <PvCard>
        <template #header>
          <img src="/aliya/game_header/aliya1.jpg" />
        </template>
        <template #title
          >{{ $t('view.home.4.card.1.title') }}&ensp;<SupportBadge level="gold"
        /></template>
        <template #subtitle>{{ $t('view.home.4.card.1.subtitle') }}</template>
        <template #content><div v-html="i18n.t('view.home.4.card.1.content')"></div></template>
      </PvCard>
      <PvCard>
        <template #header>
          <img src="/aliya/game_header/ycytx_5.jpg" />
        </template>
        <template #title
          >{{ $t('view.home.4.card.2.title') }}&ensp;<SupportBadge level="bronze"
        /></template>
        <template #subtitle>{{ $t('view.home.4.card.2.subtitle') }}</template>
        <template #content><div v-html="i18n.t('view.home.4.card.2.content')" /></template>
      </PvCard>
      <PvCard>
        <template #header>
          <img src="/aliya/game_header/tysy.jpg" />
        </template>
        <template #title
          >{{ $t('view.home.4.card.3.title') }}&ensp;<SupportBadge level="plat"
        /></template>
        <template #subtitle>{{ $t('view.home.4.card.3.subtitle') }}</template>
        <template #content><div v-html="i18n.t('view.home.4.card.3.content')" /></template>
      </PvCard>
      <PvCard>
        <template #header>
          <img src="/aliya/game_header/aliya2.jpg" />
        </template>
        <template #title
          >{{ $t('view.home.4.card.4.title') }}&ensp;<SupportBadge level="gold"
        /></template>
        <template #subtitle>{{ $t('view.home.4.card.4.subtitle') }}</template>
        <template #content><div v-html="i18n.t('view.home.4.card.4.content')" /></template>
      </PvCard>
    </div>
  </div>

  <div class="home-other-panel view-body-padding-20 mt-8">
    <h2 class="h2-title m-0 text-black mt-3">{{ $t('view.home.h2.1') }}</h2>
    <p class="h2-desc text-color m-0 mb-4" v-html="$t('view.home.1.1')"></p>
    <div class="home-feature-card-div">
      <PvCard>
        <template #title>{{ $t('view.home.1.card.1.title') }}</template>
        <template #subtitle>{{ $t('view.home.1.card.1.subtitle') }}</template>
        <template #content><div v-html="i18n.t('view.home.1.card.1.content')"></div></template>
      </PvCard>
      <PvCard>
        <template #title>{{ $t('view.home.1.card.2.title') }}</template>
        <template #subtitle>{{ $t('view.home.1.card.2.subtitle') }}</template>
        <template #content>{{ $t('view.home.1.card.2.content') }}</template>
      </PvCard>
      <PvCard>
        <template #title>{{ $t('view.home.1.card.3.title') }}</template>
        <template #subtitle>{{ $t('view.home.1.card.3.subtitle') }}</template>
        <template #content><div v-html="i18n.t('view.home.1.card.3.content')"></div></template>
      </PvCard>
    </div>
    <p class="mt-4" v-html="i18n.t('view.home.1.2')"></p>
    <p class="mt-0" v-html="i18n.t('view.home.1.3')"></p>
  </div>

  <div class="home-other-panel mt-8 p-6">
    <h2 class="h2-title text-black">{{ $t('view.home.h2.2') }}</h2>
    <h2 class="h2-title" style="margin-top: 0; font-size: 30px">
      <SpolierContent
        ><del>{{ $t('view.home.2.2') }}</del></SpolierContent
      >
    </h2>
    <br />
    <p class="h2-desc-long text-color" v-html="$t('view.home.2.3')"></p>
    <p class="h2-desc-long text-color mt-1" v-html="$t('view.home.2.4')"></p>
    <p class="h2-desc-long text-color mt-1" v-html="$t('view.home.2.5')"></p>
    <p class="h2-desc-long text-color mt-1" v-html="$t('view.home.2.6')"></p>
    <p class="h2-desc-long text-color mt-1" v-html="$t('view.home.2.7')"></p>
  </div>

  <div class="home-other-panel mt-8 p-6">
    <h2 class="h2-title text-black">{{ $t('view.home.h2.3') }}</h2>
    <p class="h2-desc text-color m-0 mb-4">
      {{ $t('view.home.3.1') }}
    </p>
    <p style="font-size: 30px; text-align: center" v-html="i18n.t('view.home.3.2')"></p>
    <br />
    <iframe src="https://store.steampowered.com/widget/2704110/" id="steam-iframe"></iframe>
  </div>
</template>

<style scoped>
#steam-iframe {
  width: v-bind(cssWidthIframe);
  height: 200px;
}
</style>

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
  font-size: 20px;
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
    font-size: 55px;
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
    font-size: 40px;
  }
}

.rainbow-animated {
  background: linear-gradient(
    90deg,
    #f00,
    #ff2b00,
    #f50,
    #ff8000,
    #fa0,
    #ffd500,
    #ff0,
    #d4ff00,
    #af0,
    #80ff00,
    #5f0,
    #2bff00,
    #0f0,
    #00ff2b,
    #0f5,
    #00ff80,
    #0fa,
    #00ffd5,
    #0ff,
    #00d4ff,
    #0af,
    #007fff,
    #05f,
    #002bff,
    #00f,
    #2a00ff,
    #50f,
    #7f00ff,
    #a0f,
    #d400ff,
    #f0f,
    #ff00d4,
    #f0a,
    #ff0080,
    #f05,
    #ff002b,
    #f00
  );
  background-size: 300% auto; /* ← key for smooth sliding */
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;

  animation: rainbow-slide 10s linear infinite;
}
@keyframes rainbow-slide {
  to {
    background-position: 300% center;
  }
}
</style>
