<script setup lang="ts">
import {onMounted} from "vue";
import LogoutButton from "@/components/LogoutButton.vue";
import {useAccessTokenStore} from "@/stores/AccessTokenStore.ts";

const accessTokenStore = useAccessTokenStore();

onMounted(() => {
  const hash = window.location.hash.substring(1); // Remove '#'
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  if (accessToken) {
    accessTokenStore.setPrincipal(accessToken)
  }
})



</script>

<template>
HOME


  <LogoutButton />
  <Toast />

</template>

<style scoped>

</style>