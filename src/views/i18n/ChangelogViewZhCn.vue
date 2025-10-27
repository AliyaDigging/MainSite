<script setup lang="ts">
import PvDivider from 'primevue/divider'
</script>

<template>
  <div class="view-body-padding-20">
    <h1 class="view-page-h1 text-black mb-0">更新日志</h1>
    <p class="view-page-h1-desc text-color mb-2" style="font-size: 1.2em">
      关于本站的功能及数据更新
    </p>
    <PvDivider />
    <h2>
      2025-10-09: 修复年份无法被正确格式化问题 (<a
        href="https://github.com/AliyaDigging/MainSite/tree/63551213924d532bd7ec5f9c0388f281cc8782e4"
        target="_blank"
        >6355121</a
      >)
    </h2>
    <h2 class="mt-2">
      2025-07-27: V1.1 (<a
        href="https://github.com/AliyaDigging/MainSite/tree/8c8509eb5d44900c3ab1fde8c6e0b9a5c8cd40e8"
        target="_blank"
        >8c8509e</a
      >)
    </h2>
    <p class="mt-2">
      相较于V1.0修了一些小bug并新增了一些小功能。欸，
      你问V1.0去哪了？Hmmmmm主要是V1.0没有一个很明确的commit界限，但是确实又修了些东西，所以不如我们直接叫V1.1算了（）
    </p>
  </div>
</template>
