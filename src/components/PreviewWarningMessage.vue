<script setup lang="ts">
import PvMessage from 'primevue/message'
</script>

<template>
  <PvMessage
    severity="warn"
    size="large"
    icon="pi pi-exclamation-triangle"
    style="text-align: left"
  >
    <div style="margin-left: 4px">
      <p style="font-size: 1.5rem; font-weight: bold">
        提请注意：您正在访问网站的预览版本（preview）!
      </p>
      <p>
        请勿将预览版及其访问方式，尤其是其中<b>未经验证的内容</b>告知除了您以外的其他人。凡您通过复制、分发、引用或其他任何方式传播本站内容，由此产生的一切责任与后果均须由您自行承担，本站概不承担任何责任。
      </p>
      <p>
        预览版本中的内容不代表网站正式版内容。视情况，本站<b>随时可能下线</b>（且无提前通知义务）。
      </p>
      <p>（求求别把官方引过来啊，我只是想安安静静做个解包而已）</p>
    </div>
  </PvMessage>
</template>
