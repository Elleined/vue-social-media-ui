<script setup lang="ts">

const hash = window.location.hash.substring(1); // Remove '#'
const params = new URLSearchParams(hash);
const accessToken = params.get('access_token');
</script>

<template>

  <Toast />
</template>

<style scoped>

</style>