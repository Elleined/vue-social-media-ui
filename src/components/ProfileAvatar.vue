<script setup lang="ts">

import {onMounted, ref, toRef} from "vue";

const props = defineProps<{
  attachment: any
}>()

const attachment = toRef(props, "attachment")
const preview = ref()

onMounted(() => {
  preview.value = URL.createObjectURL(new Blob([attachment.value]));
})
</script>

<template>
  <Avatar v-if="attachment" :image="preview" shape="circle" size="large" class="mt-1"/>
</template>

<style scoped>

</style>