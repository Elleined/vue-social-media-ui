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

const toast = useToast()
const accessTokenStore = useAccessTokenStore()

const subject = ref<string>('')
const content = ref<string>('')
const paginatedPosts = ref<Page<Post>>({} as Page<Post>)

const save = async () => {
  try {
    const post: Post = await postService.save(subject.value, content.value)
    paginatedPosts.value?.content.unshift(post)

    toast.add({ severity: 'success', summary: 'Success Message', detail: `post saved successfully`, life: 1500 });
    subject.value = ''
    content.value = ''
  } catch (e) {
    handleError(toast, e)
  }
}

const getAll = async () => {
  paginatedPosts.value = await postService.getAllWithDefault()
}

const setAccessToken = () => {
  const hash = window.location.hash.substring(1) // Remove '#'
  const params = new URLSearchParams(hash)
  const accessToken = params.get('access_token')
  if (accessToken) {
    accessTokenStore.setPrincipal(accessToken)
  }
}

onMounted( async () => {
  setAccessToken()
  await getAll()
})

</script>

<template>
  <header class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-4 space-y-4 mb-5 mt-4">
    <form class="flex justify-start items-center gap-4" @submit.prevent="save()">
      <Avatar image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" shape="circle" size="large"/>
      <FloatLabel>
        <InputText id="subject" v-model="subject" required/>
        <label for="subject">Subject</label>
      </FloatLabel>
      <FloatLabel>
        <InputText id="content" v-model="content" required/>
        <label for="content">What's on your mind?</label>
      </FloatLabel>
      <Button type="submit" label="File" severity="success" rounded icon="pi pi-file"/>
      <Button type="submit" label="Post" severity="info" rounded icon="pi pi-send"/>
    </form>
    <div class="card flex flex-wrap justify-center gap-4">
      <Image src="https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg" alt="Image" width="250" preview />
    </div>
  </header>

  <section class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-4 space-y-4">
    <PostList :paginatedPosts="paginatedPosts" />
  </section>
  <LogoutButton/>
  <Toast/>

</template>

<style scoped>

</style>