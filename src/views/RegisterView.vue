<script setup lang="ts">

import {ref} from "vue";
import {useRouter} from "vue-router";
import {useToast} from "primevue";
import handleError from "@/utils/axios-error.util.ts";
import {userService} from "@/services/user/user.service.ts";
import {fileClientService} from "@/services/file-client/file-client.service.ts";
import {useMutation} from "@tanstack/vue-query";
import type {RegisterRequest} from "@/types/request/register.request.ts";
import type {FileUploadRequest} from "@/types/request/file-upload.request.ts";

const toast = useToast()
const router = useRouter()

const firstName = ref<string>('')
const lastName = ref<string>('')
const username = ref<string>('')
const password = ref<string>('')
const attachment = ref()

// for selected image preview
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

// Mutations
const saveMutation = useMutation({
  mutationFn: (request: RegisterRequest) => userService.save(request),
  onSuccess: async () => {
    await router.push('/login')
  },
  onError: (error: Error) => {
    handleError(toast, error);
  }
});

const uploadMutation = useMutation({
  mutationFn: (request: FileUploadRequest) => fileClientService.upload(request.folder, request.attachment),
  onSuccess: (data: string) => {
    saveMutation.mutate({
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
      password: password.value,
      attachment: data,
    })
  },
  onError: (error: Error) => {
    handleError(toast, error);
  }
})

function register(): void {
  if (!attachment.value) {
    saveMutation.mutate({
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
      password: password.value,
    })
    return
  }

  uploadMutation.mutate({
    folder: "user",
    attachment: attachment.value,
  })
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
        <Button
            :loading="saveMutation.isPending.value || uploadMutation.isPending.value"
            class="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 cursor-pointer hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150" label="Register"
                type="submit"/>
      </form>
    </div>
  </main>
  <Toast/>
</template>

<style scoped>

</style>