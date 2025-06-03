<script setup lang="ts">
import {useRouter} from "vue-router";

import {ref} from "vue";
import {APIClient} from "@/utilities/APIClient.ts";
import {useAccessTokenStore} from "@/stores/AccessTokenStore.ts";
import {useRefreshTokenStore} from "@/stores/RefreshTokenStore.ts";
import {handleAxiosError} from "@/utilities/AxiosErrorHandler.ts";
import {useToast} from "primevue";

const toast = useToast()
const router = useRouter()
const accessTokenStore = useAccessTokenStore()
const refreshTokenStore = useRefreshTokenStore()

const username = ref<string>()
const password = ref<string>()

async function authenticate() {
  try {
    const { data } = await APIClient().post('/users/login', {
      username: username.value,
      password: password.value
    })

    accessTokenStore.setPrincipal(data.access_token)
    refreshTokenStore.setPrincipal(data.refresh_token)
    await router.push('/home')
  } catch (e) {
    handleAxiosError(toast, e)
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen px-6 py-12 lg:px-8">
    <div class="w-full max-w-sm">
      <form class="space-y-6" @submit.prevent="authenticate()">
        <div>
          <label for="username" class="block text-sm/6 font-medium text-gray-900">Username</label>
          <div class="mt-2">
            <input
                type="email"
                name="username"
                id="username"
                autocomplete="username"
                required
                v-model="username"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
          </div>
          <div class="mt-2">
            <input
                type="password"
                name="password"
                id="password"
                autocomplete="current-password"
                v-model="password"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
  <Toast />
</template>

<style scoped>

</style>