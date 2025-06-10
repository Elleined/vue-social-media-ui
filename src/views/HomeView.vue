<script setup lang="ts">
import {onMounted, ref} from "vue";
import LogoutButton from "@/components/LogoutButton.vue";
import {useAccessTokenStore} from "@/stores/AccessTokenStore.ts";
import PostList from "@/components/post/PostList.vue";
import type Post from "@/models/Post.ts";
import {postService} from "@/services/PostService.ts";
import type Page from "@/models/paging/Page.ts";
import {useToast} from "primevue";
import handleError from "@/utilities/AxiosErrorHandler.ts";
import {fileService} from "@/services/FileService.ts";

const toast = useToast()
const accessTokenStore = useAccessTokenStore()

const preview = ref()

const content = ref<string>('')
const attachment = ref()
const paginatedPosts = ref<Page<Post>>({} as Page<Post>)

const save = async () => {
  try {
    if (!attachment.value) {
      const postId: number = await postService.save(content.value, attachment.value);
      const post: Post = await postService.getById(postId)

      paginatedPosts.value.content.unshift(post)
      toast.add({severity: 'success', summary: 'Success Message', detail: `post saved successfully`, life: 1500});

      clearFields()
      return
    }

    const uploadedAttachment: string = await fileService.upload("post", attachment.value)
    const postId: number = await postService.save(content.value, uploadedAttachment)
    const post: Post = await postService.getById(postId)

    paginatedPosts.value.content.unshift(post)
    toast.add({severity: 'success', summary: 'Success Message', detail: `post saved successfully`, life: 1500});

    clearFields()
  } catch (e) {
    handleError(toast, e)
  }
}

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

const setAccessToken = () => {
  const hash = window.location.hash.substring(1) // Remove '#'
  const params = new URLSearchParams(hash)
  const accessToken = params.get('access_token')
  if (accessToken) {
    accessTokenStore.setPrincipal(accessToken)
  }
}

const clearFields = () => {
  content.value = ''
  attachment.value = null
  preview.value = null
}

onMounted(async () => {
  try {
    setAccessToken()
    paginatedPosts.value = await postService.getAllWithDefault()
  } catch (e) {
    handleError(toast, e)
  }
})

</script>

<template>
  <header class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-4 space-y-4 mb-5 mt-4">
    <form class="flex justify-center items-center gap-4" @submit.prevent="save()">
      <Avatar image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" shape="circle" size="large"/>
      <FloatLabel>
        <InputText id="content" v-model="content" required/>
        <label for="content">What's on your mind?</label>
      </FloatLabel>
      <FileUpload mode="basic" @select="previewImage" customUpload auto severity="secondary" class="p-button-outlined" />
      <Button type="submit" label="Post" severity="info" rounded icon="pi pi-send"/>
    </form>
    <div class="card flex flex-wrap justify-center gap-4">
      <Image v-if="preview" :src="preview" alt="Image" width="250" preview/>
    </div>
  </header>

  <section class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-4 space-y-4">
    <PostList :paginatedPosts="paginatedPosts" v-if="paginatedPosts.content?.length != 0"/>
    <div v-else class="text-center font-bold font-italic text-2xl">No posts yet!</div>
  </section>
  <LogoutButton/>
  <Toast/>

</template>

<style scoped>

</style>