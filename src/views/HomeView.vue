<script setup lang="ts">
import {onMounted} from "vue";

onMounted(() => {
  const hash = window.location.hash.substring(1); // Remove '#'
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  console.log(accessToken);
})
</script>

<template>
adasasdas
  <Toast />
</template>

<style scoped>

</style>