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

const formattedDate = computed(() => formatDate(post.value.created_at));

const getAuthor = async () => {
  author.value = await userService.getById(post.value.author_id)
}

const showImage = async () => {
  const response = await fileService.read("post", post.value.attachment.String)
  const blob = new Blob([response]);
  attachment.value = URL.createObjectURL(blob);
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
        <p>{{ author.first_name }} {{ author.last_name }}</p>
        <p>{{ formattedDate }}</p>
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
      <Button type="button" label="Comments" icon="pi pi-comments" badge="2" badgeSeverity="secondary" variant="outlined" />
    </footer>
  </div>
  <Toast/>
</template>

<style scoped>
</style>