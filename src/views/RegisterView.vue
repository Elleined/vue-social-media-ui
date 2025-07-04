<script setup lang="ts">

import {ref} from "vue";
import {useRouter} from "vue-router";
import {useToast} from "primevue";
import handleError from "@/utilities/AxiosErrorHandler.ts";
import {userService} from "@/services/UserService.ts";
import {fileService} from "@/services/FileService.ts";

const toast = useToast()
const router = useRouter()

const firstName = ref<string>('')
const lastName = ref<string>('')
const username = ref<string>('')
const password = ref<string>('')
const attachment = ref()

const preview = ref()
const previewImage = (event: any) => {
  attachment.value = event.files[0]
  const reader = new FileReader()

  reader.onload = () => {
    if (reader.result) {
      preview.value = reader.result
    }
  }

  reader.readAsDataURL(attachment.value)
}

async function register() {
  try {
    if (!attachment.value) {
      await userService.save(firstName.value, lastName.value, username.value, password.value)
      await router.push('/login')
      return
    }

    const uploadedAttachment: string = await fileService.upload("user", attachment.value)
    await userService.save(firstName.value, lastName.value, username.value, password.value, uploadedAttachment)
    await router.push('/login')
  } catch (e) {
    handleError(toast, e)
  }
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
            <button @click="goToLogin()" type="button"
                    class="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">Log in
            </button>
          </p>
        </div>
      </div>
      <form @submit.prevent="register()" class="flex flex-col justify-center items-center gap-4">
        <IftaLabel>
          <InputText id="firstName" v-model="firstName" required />
          <label for="firstName">First name</label>
        </IftaLabel>
        <IftaLabel>
          <InputText id="lastName" v-model="lastName" required />
          <label for="lastName">Last name</label>
        </IftaLabel>
        <IftaLabel>
          <InputText name="username" id="username" type="email" v-model="username" required />
          <label for="username">Username</label>
        </IftaLabel>
        <IftaLabel>
          <Password v-model="password" inputId="password" variant="filled"  />
          <label for="password">Password</label>
        </IftaLabel>
        <FileUpload mode="basic" @select="previewImage" customUpload auto severity="secondary" class="p-button-outlined mt-2" choose-label="Profile picture"/>
        <div class="card flex flex-wrap justify-center mt-2">
          <Image v-if="preview" :src="preview" alt="Image" width="250" preview/>
        </div>
        <button
            class="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 cursor-pointer hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
          Register
        </button>
      </form>
    </div>
  </main>
  <Toast/>
</template>

<style scoped>

</style>