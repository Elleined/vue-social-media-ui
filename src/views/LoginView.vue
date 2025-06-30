<script setup lang="ts">
import {useRouter} from "vue-router";

import google from "@/assets/google.png";
import microsoft from "@/assets/microsoft.png";
import facebook from "@/assets/facebook.png";

import {ref} from "vue";
import {BASE_URL} from "@/utilities/APIClient.ts";
import handleError from "@/utilities/AxiosErrorHandler.ts";
import {useToast} from "primevue";
import {userService} from "@/services/UserService.ts";
import {useMutation} from "@tanstack/vue-query";

const toast = useToast()
const router = useRouter()

const username = ref<string>('')
const password = ref<string>('')

interface Request {
  username: string;
  password: string;
}

const loginMutation = useMutation({
  mutationFn: (request: Request) => userService.login(request.username, request.password),
  onSuccess: async () => {
    await router.push("/home");
  },
  onError: error => {
    handleError(toast, error)
  }
})

function login() {
  loginMutation.mutate({
    username: username.value,
    password: password.value
  })
}

async function goToRegister() {
  await router.push('/register')
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
            <button @click="goToRegister()" type="button" class="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500">Sign up</button>
          </p>
        </div>
      </div>
      <form @submit.prevent="login">
        <div>
          <label class="font-medium"> Email </label>
          <input
              type="email"
              v-model="username"
              required
              class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label class="font-medium"> Password </label>
          <input
              type="password"
              v-model="password"
              required
              autocomplete="off"
              class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <button
            type="submit" class="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600  cursor-pointer hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
          Log in
        </button>
      </form>
      <div class="relative">
        <span class="block w-full h-px bg-gray-300"></span>
        <p class="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">
          Or continue with
        </p>
      </div>
      <div class="space-y-4 text-sm font-medium">
        <a :href="`${BASE_URL}/auth/google`" class="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg cursor-pointer hover:bg-gray-50 duration-150 active:bg-gray-100">
          <img
              :src="google"
              alt="Google"
              class="w-5 h-5"
          />
          Continue with Google
        </a>

        <a :href="`${BASE_URL}/auth/microsoft`" class="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg cursor-pointer hover:bg-gray-50 duration-150 active:bg-gray-100">
          <img
              :src="microsoft"
              alt="Google"
              class="w-5 h-5"
          />
          Continue with Microsoft
        </a>

        <a :href="`${BASE_URL}/auth/facebook`" class="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg cursor-pointer hover:bg-gray-50 duration-150 active:bg-gray-100">
          <img
              :src="facebook"
              alt="Facebook"
              class="w-6 h-6"
          />
          Continue with Facebook
        </a>

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