<script setup lang="ts">
import {useRouter} from "vue-router";
import handleError from "@/utils/axios-error.util.ts";
import {useToast} from "primevue";
import {userService} from "@/services/user/user.service.ts";

const toast = useToast()
const router = useRouter()

async function logout() {
  try {
    await userService.logout()
    await router.push('/login')
  } catch (e) {
    handleError(toast, e)
  }
}
</script>

<template>
  <Button icon="pi pi-sign-out" severity="danger" variant="text" rounded aria-label="Logout" @click="logout()" />
  <Toast />
</template>

<style scoped>

</style>