<script setup lang="ts">
import { inject } from 'vue'

const dialogRef = inject<{ data: { content: string } }>('dialogRef')
</script>

<template>
  <p>{{ dialogRef!.data.content }}</p>
</template>
