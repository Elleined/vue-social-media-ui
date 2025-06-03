<script setup lang="ts">
import {useRouter} from "vue-router";

import {ref} from "vue";
import {APIClient} from "@/utilities/APIClient.ts";
import {useAccessTokenStore} from "@/stores/AccessTokenStore.ts";
import {useRefreshTokenStore} from "@/stores/RefreshTokenStore.ts";
import handleError from "@/utilities/AxiosErrorHandler.ts";
import {useToast} from "primevue";

const toast = useToast()
const router = useRouter()
const accessTokenStore = useAccessTokenStore()
const refreshTokenStore = useRefreshTokenStore()

const username = ref<string>()
const password = ref<string>()

async function authenticate() {
  try {
    const {data} = await APIClient().post('/users/login', {
      username: username.value,
      password: password.value
    })

    accessTokenStore.setPrincipal(data.access_token)
    refreshTokenStore.setPrincipal(data.refresh_token)
    await router.push('/home')
  } catch (e) {
    handleError(toast, e)
  }
}
</script>

<template>
  <main
      class="w-full h-screen flex flex-col items-center justify-center px-4">
    <div class="max-w-sm w-full text-gray-600 space-y-8">
      <div class="text-center">
        <div class="mt-5 space-y-2">
          <h3 class="text-gray-800 text-2xl font-bold sm:text-3xl">
            Log in to your account
          </h3>
          <p>
            Don't have an account?
            <a href="javascript:void(0)" class="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a>
          </p>
        </div>
      </div>
      <form @submit.prevent>
        <div>
          <label class="font-medium"> Email </label>
          <input
              type="email"
              required
              class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label class="font-medium"> Password </label>
          <input
              type="password"
              required
              class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <button class="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
          Sign in
        </button>
      </form>
      <div class="relative">
        <span class="block w-full h-px bg-gray-300"></span>
        <p class="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
          Or continue with
        </p>
      </div>
      <div class="space-y-4 text-sm font-medium">
        <button class="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
          <img
              src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
              alt="Google"
              class="w-5 h-5"
          />
          Continue with Google
        </button>
        <button class="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
          <img
              src="https://raw.githubusercontent.com/sidiDev/remote-assets/f7119b9bdd8c58864383802fb92c7fc3a25c0646/twitter-icon.svg"
              alt="Twitter"
              class="w-5 h-5"
          />
          Continue with Microsoft
        </button>
        <button class="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg hover:bg-gray-50 duration-150 active:bg-gray-100">
          <img
              src="https://raw.githubusercontent.com/sidiDev/remote-assets/0d3b55a09c6bb8155ca19f43283dc6d88ff88bf5/github-icon.svg"
              alt="Github"
              class="w-5 h-5" />
          Continue with Facebook
        </button>
      </div>
      <div class="text-center">
        <a href="javascript:void(0)" class="text-indigo-600 hover:text-indigo-500">Forgot password?</a>
      </div>
    </div>
  </main>
  <Toast/>
</template>

<style scoped>

</style>

<!--<div class="w-full max-w-sm">-->
<!--<form class="space-y-6" @submit.prevent="authenticate()">-->
<!--  <div>-->
<!--    <label for="username" class="block text-sm/6 font-medium text-gray-900">Username</label>-->
<!--    <div class="mt-2">-->
<!--      <input-->
<!--          type="email"-->
<!--          name="username"-->
<!--          id="username"-->
<!--          autocomplete="username"-->
<!--          required-->
<!--          v-model="username"-->
<!--          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"-->
<!--      />-->
<!--    </div>-->
<!--  </div>-->

<!--  <div>-->
<!--    <div class="flex items-center justify-between">-->
<!--      <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>-->
<!--    </div>-->
<!--    <div class="mt-2">-->
<!--      <input-->
<!--          type="password"-->
<!--          name="password"-->
<!--          id="password"-->
<!--          autocomplete="current-password"-->
<!--          v-model="password"-->
<!--          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"-->
<!--      />-->
<!--    </div>-->
<!--  </div>-->

<!--  <div>-->
<!--    <button-->
<!--        type="submit"-->
<!--        class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"-->
<!--    >-->
<!--      Sign in-->
<!--    </button>-->
<!--  </div>-->
<!--</form>-->
<!--</div>-->