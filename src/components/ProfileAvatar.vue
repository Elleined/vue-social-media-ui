<script setup lang="ts">

import {onMounted, ref, toRef, toRefs} from "vue";

const props = defineProps<{
  picture: any
}>()

const attachment = toRef(props, "picture")
const preview = ref()

onMounted(() => {
  const blob = new Blob([attachment.value]);
  preview.value = URL.createObjectURL(blob);
})
</script>

<template>
  <Avatar :image="preview" shape="circle" size="large" class="mt-1"/>
</template>

<style scoped>

</style>