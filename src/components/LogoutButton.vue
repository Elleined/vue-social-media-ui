<script setup lang="ts">
import {useRouter} from "vue-router";
import handleError from "@/utils/axios-error.util.ts";
import {useToast} from "primevue";
import {userService} from "@/services/user/user.service.ts";
import {useMutation} from "@tanstack/vue-query";

const toast = useToast()
const router = useRouter()

const logoutMutation = useMutation({
  mutationFn: () => userService.logout(),
  onSuccess: async () => {
    await router.push('/login')
  },
  onError: (error: Error) => {
    handleError(toast, error)
  }
})

function logout() {
  logoutMutation.mutate()
}
</script>

<template>
  <Button icon="pi pi-sign-out" severity="danger" variant="text" rounded aria-label="Logout" @click="logout()" />
  <Toast />
</template>

<style scoped>

</style>