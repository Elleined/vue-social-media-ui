<script setup lang="ts">

import type Post from "@/models/Post.ts";
import {computed, onMounted, ref, toRef} from "vue";
import type User from "@/models/User.ts";
import {userService} from "@/services/UserService.ts";
import {formatDate} from "@/utilities/DateFormatter.ts";
import type {MenuItem} from "primevue/menuitem";

// Props
const props = defineProps<{
  post: Post;
}>()

// Refs

const post = toRef(props, "post")
const author = ref<User>({} as User)

// Computed
const formattedDate = computed(() => formatDate(post.value.created_at));

// Life cycle hooks
onMounted(async () => {
  author.value = await userService.getById(post.value.author_id)
})
</script>

<template>
  <header class="flex items-start gap-3 w-full">
    <Avatar image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" shape="circle" size="large" />

    <div class="flex-1">
      <p>{{ author.first_name }} {{ author.last_name }}</p>
      <p>{{ formattedDate }}</p>
    </div>
  </header>

  <section>
    <p class="text-center font-bold font-italic text-xl mt-4">{{ post.subject }}</p>
    <span class="mt-4">{{ post.content }}</span>
    <div class="card flex flex-wrap justify-center gap-4 mt-4">
      <Image src="https://primefaces.org/cdn/primevue/images/galleria/galleria10.jpg" alt="Image" width="250" preview />
    </div>
  </section>

  <footer class="flex justify-between items-center mt-4">
    <Button type="button" label="Like" icon="pi pi-thumbs-up" badge="2" badgeSeverity="secondary" variant="outlined"  />
    <Button type="button" label="Comments" icon="pi pi-comments" badge="2" badgeSeverity="secondary" variant="outlined"  />
  </footer>
</template>

<style scoped>
</style>