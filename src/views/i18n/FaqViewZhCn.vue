<script setup lang="ts">
import PvDivider from 'primevue/divider'
</script>

<template>
  <div class="view-body-padding-20">
    <h1 class="view-page-h1 text-black mb-0">常见问题</h1>
    <p class="view-page-h1-desc text-color mb-2" style="font-size: 1.2em">你可能会有的疑问</p>
    <p class="mb-2">
      有未尽事宜？请通过<RouterLink to="/about">关于页</RouterLink
      >联系我们，我们将收集您的问题并在日后将其添加在本页面上。
    </p>
    <PvDivider />
    <h2>流程图相关</h2>
    <p class="mt-2">Q：“命令块”（command block）是什么？</p>
    <p class="mt-2">
      A：“命令块”（command block）是游戏底层使用的
      <a href="https://fungusgames.com/" target="_blank">Fungus</a> Unity
      插件用来编排故事逻辑的一条条“命令”的说法（因其将各条命令可视化为一个个“块”（block），类似于本站可视化的流程图上的一个个“节点”（node）），一个“命令块”代表一条单独的命令。
    </p>
    <p class="mt-4">Q：条件判断类命令块中的“真”“假”是什么意思？</p>
    <p class="mt-2">
      A：“真”“假”分别对应英语中的“true”“false”，即“布尔值”（boolean）的两种可能取值，属计算机领域术语，此处可理解为条件的“成立”与“不成立”。
    </p>
    <p class="mt-4">
      Q：为什么有些“判断-如果”（If block）命令块后面会接着一条“（条件为假时的）虚拟分支”？
    </p>
    <p class="mt-2">
      A：简单来说的话，是因为有些判断后面还跟着别的命令。复杂一点的话，是因为我们的确见到了诸如“命令1-If-Then-命令3-EndIf-命令2”这种结构，即
      If block 的作用仅是用来跳过部分命令的执行，存在一种“隐形的 Else
      分支”（即，不做任何事，直接跳过 If block 而跳转到 EndIf 后面的命令）；这些隐形的“Else 分支”在
      Fungus 中并没有体现出来，而若将它们直接连到 If block
      上却只以连接线的颜色不同区分，我们认为很可能会出现排版异常和误读问题。有鉴于以上原因，我们对数据进行了预处理，在原数据中加入了额外的“Else
      块”以便后续处理能够正确反映此种关系。
    </p>
    <p class="mt-4">Q：为什么有些“判断-结束”（EndIf）块没有被连接？</p>
    <p class="mt-2">
      A：这表明在这个条件判断中，两条分支最后都指向（跳到）了另一个“命令组块”（不同的对话等）。严格来说两条分支最后的那一些命令块也应指向结束块，但有鉴于那样可能会让用户混淆哪一些才是真正的后续命令块，因而在处理时我们不对“跳到xx命令块”此种命令块做连接处理，仅将这些块连到它真正要指向（跳转）到的命令块。
    </p>
    <p class="mt-4">Q：为什么一个块后面会接着多个“玩家选项”？多个“选项”同时出现的意义是什么？</p>
    <p class="mt-2">
      A：“玩家选项”在内部共分为三种：文本选项（你的“回复”文本）、隐形选项（通过触发特定按钮）、默认（自动）选项（等待一段时间，超时自动触发）。所有这些选项的地位都是平等的，只要一个选项被正确触发，剩下的就都不会被触发（所谓的“自动触发”，例如<RouterLink
        to="/view/flowchart/1-2"
        >故事开头 Aliya 向你高速解释现状</RouterLink
      >这种，其实还是因为默认选项等待时间过短、玩家来不及做出反应导致的）。
    </p>
    <p class="mt-2">
      有意思的是，仅需这三种选项，游戏就成功实现了如“让玩家控制发动机引擎运行时间”这种互动，真的非常非常妙。你可以在例如<RouterLink
        to="/view/flowchart/4-1"
        >流程图 4-1（降落科朗2-C）</RouterLink
      >中看到这种方法，非常非常有趣的编程思路。
    </p>
  </div>
</template>
