<script setup lang="ts">

import google from "@/assets/google.png";
import microsoft from "@/assets/microsoft.png";
import facebook from "@/assets/facebook.png";
import {ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()

const firstName = ref<string>()
const lastName = ref<string>()
const username = ref<string>()
const password = ref<string>()

async function authenticate() {

}

async function goToLogin() {
  await router.push('/login')
}

</script>

<template>
  <main class="w-full h-screen flex flex-col items-center justify-center px-4">
    <div class="max-w-sm w-full text-gray-600 space-y-8">
      <div class="text-center">
        <div class="mt-5 space-y-2">
          <h3 class="text-gray-800 text-2xl font-bold sm:text-3xl">
            Register your account
          </h3>
          <p>
            Already have an account?
            <button @click="goToLogin()" type="button" class="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">Log in</button>
          </p>
        </div>
      </div>
      <form @submit.prevent="authenticate()">
        <div>
          <label class="font-medium"> First name </label>
          <input
              type="text"
              v-model="firstName"
              required
              class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label class="font-medium"> Last name </label>
          <input
              type="text"
              v-model="lastName"
              required
              class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
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
              class="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
          />
        </div>
        <button
            class="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 cursor-pointer hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
          Register
        </button>
      </form>
    </div>
  </main>
</template>

<style scoped>

</style>