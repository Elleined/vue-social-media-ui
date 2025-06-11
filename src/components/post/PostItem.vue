<script setup lang="ts">

import type Post from "@/models/Post.ts";
import {computed, onMounted, ref, toRef} from "vue";
import type User from "@/models/User.ts";
import {userService} from "@/services/UserService.ts";
import {formatDate} from "@/utilities/DateFormatter.ts";
import {fileService} from "@/services/FileService.ts";
import handleError from "@/utilities/AxiosErrorHandler.ts";
import {useToast} from "primevue";

const toast = useToast()

const props = defineProps<{
  post: Post;
}>()

const post = toRef(props, "post")
const author = ref<User>({} as User)
const attachment = ref()
const commentDialogVisible = ref<boolean>(false)

const formattedDate = computed(() => formatDate(post.value.created_at));

const getAuthor = async () => {
  author.value = await userService.getById(post.value.author_id)
}

const showImage = async () => {
  const response = await fileService.read("post", post.value.attachment.String)
  const blob = new Blob([response]);
  attachment.value = URL.createObjectURL(blob);
}

const commentClicked = () => {
  commentDialogVisible.value = true
}

onMounted(async () => {
  try {
    await getAuthor()
    await showImage()
  } catch (e) {
    handleError(toast, e)
  }
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <header class="flex items-start gap-3">
      <Avatar image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" shape="circle" size="large" class="mt-1"/>
      <div>
        <p class="font-bold">{{ author.first_name }} {{ author.last_name }}</p>
        <p class="font-light">{{ formattedDate }}</p>
      </div>
    </header>

    <section>
      <span>{{ post.content }}</span>
      <div class="card flex flex-wrap justify-center gap-4 mt-4">
        <Image v-if="post.attachment.Valid" :src="attachment" :alt="post.attachment.String" width="250" preview />
      </div>
    </section>

    <footer class="flex justify-between items-center">
      <Button type="button" label="Like" icon="pi pi-thumbs-up" badge="2" badgeSeverity="secondary" variant="outlined" />
      <Button type="button" label="Comments" icon="pi pi-comments" badge="2" badgeSeverity="secondary" variant="outlined" @click="commentClicked" />
    </footer>
  </div>
  <Toast/>

  <Dialog v-model:visible="commentDialogVisible" modal :header="author.first_name + '\'s Post'" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <PostItem :post="post" />
    <header class="max-w-3xl mx-auto bg-white rounded-2xl p-4 space-y-4 mb-5 mt-4">
      <form class="flex justify-center items-center gap-4" @submit.prevent="save()">
        <Avatar image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" shape="circle" size="large"/>
        <FloatLabel>
          <InputText id="content" v-model="content" required/>
          <label for="content">Comment as </label>
        </FloatLabel>
        <FileUpload mode="basic" @select="previewImage" customUpload auto severity="secondary" class="p-button-outlined" />
        <Button type="submit" label="Post" severity="info" rounded icon="pi pi-send"/>
      </form>
      <div class="card flex flex-wrap justify-center gap-4">
        <Image v-if="preview" :src="preview" alt="Image" width="250" preview/>
      </div>
    </header>
  </Dialog>
</template>

<style scoped>
</style>