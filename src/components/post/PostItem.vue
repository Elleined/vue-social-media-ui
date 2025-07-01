<script setup lang="ts">

import {computed, toRef} from "vue";
import {userService} from "@/services/user/user.service.ts";
import {fileClientService} from "@/services/file-client/file-client.service.ts";
import type {Post} from "@/types/models/post/post.model.ts";
import {useQuery} from "@tanstack/vue-query";
import {dateUtil} from "@/utils/date.util.ts";

const props = defineProps<{
  post: Post;
}>()

const post = toRef(props, "post")

const { data: author } = useQuery({
  queryKey: ['author', post.value.author_id],
  queryFn: () => userService.getById(post.value.author_id),
  enabled: !!post.value.author_id, // Only fetch if author_id exists
})

const { data: attachment } = useQuery({
  queryKey: ['attachment', post.value.attachment.String],
  queryFn: () => fileClientService.read("post", post.value.attachment.String),
  enabled: post.value.attachment.Valid, // Only fetch if attachment exists
})

const formattedDate = computed(() => dateUtil.formatDate(post.value.created_at));
const preview = computed(() => {
  return attachment.value
      ? URL.createObjectURL(new Blob([attachment.value]))
      : null
})
</script>

<template>
  <div class="flex flex-col gap-5">
    <header class="flex items-start gap-3">
      <div>
        <p class="font-bold">{{ author?.first_name }} {{ author?.last_name }}</p>
        <p class="font-light">{{ formattedDate }}</p>
      </div>
    </header>

    <section>
      <span>{{ post.content }}</span>
      <div class="card flex flex-wrap justify-center gap-4 mt-4">
        <Image v-if="post.attachment.Valid && preview" :src="preview" :alt="post.attachment.String" width="250" preview/>
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