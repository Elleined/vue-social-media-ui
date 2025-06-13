<script setup lang="ts">

defineProps<{
  url: string
}>()

</script>

<template>
  <Avatar :image="url" shape="circle" size="large" class="mt-1"/>
</template>

<style scoped>

</style>