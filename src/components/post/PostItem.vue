<script setup lang="ts">

import {computed, onMounted, ref, toRef} from "vue";
import {userService} from "@/services/UserService.ts";
import {formatDate} from "@/utilities/DateFormatter.ts";
import {fileService} from "@/services/FileService.ts";
import handleError from "@/utilities/AxiosErrorHandler.ts";
import {useToast} from "primevue";
import type {Post, User} from "@/types/model.d.ts";

const toast = useToast()

const props = defineProps<{
  post: Post;
}>()

const post = toRef(props, "post")
const author = ref<User>({} as User)
const attachment = ref() // for showing the post attachment

const formattedDate = computed(() => formatDate(post.value.created_at));

onMounted(async () => {
  try {
    const [authorResponse, attachmentResponse] = await Promise.all([
      userService.getById(post.value.author_id),
      fileService.read("post", post.value.attachment.String)
    ])

    author.value = authorResponse
    attachment.value = URL.createObjectURL(new Blob([attachmentResponse]));
  } catch (e) {
    handleError(toast, e)
  }
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <header class="flex items-start gap-3">
      <div>
        <p class="font-bold">{{ author.first_name }} {{ author.last_name }}</p>
        <p class="font-light">{{ formattedDate }}</p>
      </div>
    </header>

    <section>
      <span>{{ post.content }}</span>
      <div class="card flex flex-wrap justify-center gap-4 mt-4">
        <Image v-if="post.attachment.Valid" :src="attachment" :alt="post.attachment.String" width="250" preview/>
      </div>
    </section>

    <footer class="flex justify-between items-center">
      <Button type="button" label="Like" icon="pi pi-thumbs-up" badge="2" badgeSeverity="secondary" variant="outlined"/>
      <Button type="button" label="Comments" icon="pi pi-comments" badge="2" badgeSeverity="secondary"
              variant="outlined"/>
    </footer>
  </div>
  <Toast/>
</template>

<style scoped>
</style>