<script setup lang="ts">
import {onMounted, ref} from "vue";
import LogoutButton from "@/components/LogoutButton.vue";
import PostList from "@/components/post/PostList.vue";
import {postService} from "@/services/post/post.service.ts";
import {useToast} from "primevue";
import handleError from "@/utils/axios-error.util.ts";
import {fileClientService} from "@/services/file-client/file-client.service.ts";
import {useQuery} from "@tanstack/vue-query";
import type {Page} from "@/types/models/page/page.model.ts";
import type {Post} from "@/types/models/post/post.model.ts";

const toast = useToast()

// for selected image preview
const preview = ref()

const content = ref<string>('')
const attachment = ref()

const paginatedPosts = ref<Page<Post>>({} as Page<Post>)


const save = async () => {
  try {
    if (!attachment.value) {
      const postId: number = await postService.save(content.value);
      const post: Post = await postService.getById(postId)
      paginatedPosts.value.content.unshift(post)

      toast.add({severity: 'success', summary: 'Success Message', detail: `post saved successfully`, life: 1500});
      clearFields()
      return
    }

    const uploadedAttachment: string = await fileClientService.upload("post", attachment.value)
    const postId: number = await postService.save(content.value, uploadedAttachment)
    const post: Post = await postService.getById(postId)
    paginatedPosts.value.content.unshift(post)

    toast.add({severity: 'success', summary: 'Success Message', detail: `post saved successfully`, life: 1500});
    clearFields()
  } catch (e) {
    handleError(toast, e)
  }
}

const previewAttachment = (event: any) => {
  attachment.value = event.files[0]
  const reader = new FileReader()

  reader.onload = () => {
    if (reader.result) {
      preview.value = reader.result
    }
  }

  reader.readAsDataURL(attachment.value)
}

const clearFields = () => {
  content.value = ''
  attachment.value = null
  preview.value = null
}

onMounted(async () => {
  try {
    paginatedPosts.value = await postService.getAllWithDefault()
  } catch (e) {
    handleError(toast, e)
  }
})

</script>

<template>
  <header class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-4 space-y-4 mb-5 mt-4">
    <form class="flex justify-center items-center gap-4" @submit.prevent="save()">
<!--      <UserAvatar v-if="currentUserStore.getPrincipal().attachment.Valid" :url="`http://localhost:8090/folders/user/files/${currentUserStore.getPrincipal().attachment.String}`" />-->
      <FloatLabel>
        <InputText id="content" v-model="content" required/>
        <label for="content">What's on your mind?</label>
      </FloatLabel>
      <FileUpload mode="basic" @select="previewAttachment" customUpload auto severity="secondary" class="p-button-outlined" />
      <Button type="submit" label="Post" severity="success" rounded icon="pi pi-send"/>
    </form>
    <div class="card flex flex-wrap justify-center gap-4">
      <Image v-if="preview" :src="preview" alt="Image" width="250" preview/>
    </div>
  </header>

  <section class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-4 space-y-4">
    <PostList :paginatedPosts="paginatedPosts" v-if="paginatedPosts.content?.length != 0"/>
    <div v-else class="text-center font-bold font-italic text-2xl">No posts yet!</div>
  </section>

  <a href="https://www.flaticon.com/free-icons/facebook" title="facebook icons">Facebook icons created by QudaDesign - Flaticon</a>
  <LogoutButton/>
  <Toast/>

</template>

<style scoped>

</style>