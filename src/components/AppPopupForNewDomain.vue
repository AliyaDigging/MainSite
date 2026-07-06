<script setup lang="ts">
import { symbolUseDark } from '@/constants/injection'
import { computed, inject, type Ref } from 'vue'

const isDark = inject(symbolUseDark)!
const cssCodeBgColor = computed(() => (isDark.value ? '#4a1c1f' : '#fff5f5'))
const cssCodeTextColor = computed(() => (isDark.value ? '#ff6b6b' : '#dc3545'))

const dialogRef = inject('dialogRef') as Ref<{ data: Record<string, unknown> }>
</script>

<template>
  <template v-if="dialogRef">
    <template v-if="dialogRef.data.lang === 'zh-CN'">
      <h2 class="mb-2" style="font-size: 1.5rem; font-weight: 600">
        我们已启用<a href="https://aliyadb.link/">新域名</a>！
      </h2>
      <p>
        为庆祝ALIYA DB正式运营一周年以及<a
          href="https://store.steampowered.com/app/4138920/Aliya2/"
          target="_blank"
          >《彼方的她-Aliya2 曙光》</a
        >Demo的发行，我们特此注册了新域名<b><a href="https://aliyadb.link">aliyadb.link</a></b
        >，旨在帮助用户更好记忆网站网址及提升网站整体的辨识度。
      </p>
      <p>
        同时，新域名还使用了<b>中国内地CDN（阿里云ESA）</b>进行加速，可极大提升国内用户的访问体验。
      </p>
      <h2 class="mt-4 mb-2" style="font-size: 1.5rem; font-weight: 600">旧域名何时下线？</h2>
      <p>
        我们计划当新域名成功被Google等主要搜索引擎索引记录后即下线旧域名
        (<code>aliya.cnfast.top</code>)，具体下线时间可能定于今年的八月或九月份。
      </p>
      <p>
        在旧域名下线后，为确保向后兼容性，旧域名将使用一个CloudFlare
        Worker进行自动重定向到新域名，以确保旧的业务逻辑不受影响。尽管如此，我们仍然建议您修改您的书签、文章等处的链接地址，以避免不必要的麻烦。
      </p>
      <br />

      <h2 style="font-size: 1.5rem; font-weight: 600">
        <a href="https://aliyadb.link/">现在就切换到新域名 <code>aliyadb.link</code> 吧！</a>
      </h2>
    </template>
    <template v-else>
      <h2 class="mb-2" style="font-size: 1.5rem; font-weight: 600">
        <a href="https://aliyadb.link/">New Domain</a> In Use Now!
      </h2>
      <p>
        To celebrate ALIYA DB's first anniversary and the release of
        <a href="https://store.steampowered.com/app/4138920/Aliya2/" target="_blank"
          >Aliya: Timelink 2 Dawn</a
        >
        Demo, we registered a new domain called
        <b><a href="https://aliyadb.link">aliyadb.link</a></b
        >!
      </p>
      <p>
        This aims to help our users and players to be able to remember and memorize the website more
        easily, while also enhancing the recognizability of our site in general.
      </p>
      <p>
        The new domain also comes with <b>China Mainland CDN</b> (Aliyun ESA), which further
        enhances the user experience in China Mainland.
      </p>
      <h2 class="mt-4 mb-2" style="font-size: 1.5rem; font-weight: 600">
        When Will the Old One be Deprecated?
      </h2>
      <p>
        We expect to shut down the old one (<code>aliya.cnfast.top</code>) once the new one appears
        in Google and other major search engines, possibly around Aug. and Sep. this year.
      </p>
      <p>
        After the shutdown, the website will be replaced by a CloudFlare Worker that automatically
        redirects you to the new domain. Though it's true that the website remains available to some
        extent, we still highly recommend you to change your bookmarks, links, etc. to the new
        domain to avoid unnecessary troubles.
      </p>
      <br />

      <h2 style="font-size: 1.5rem; font-weight: 600">
        <a href="https://aliyadb.link/">Switch to new domain now: <code>aliyadb.link</code>!</a>
      </h2>
    </template>
  </template>
</template>

<style scoped>
code {
  background-color: v-bind(cssCodeBgColor) !important;
  padding: 2px 4px;
  border-radius: 4px;
  color: v-bind(cssCodeTextColor);
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.8em;
}
</style>
