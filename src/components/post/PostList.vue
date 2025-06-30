<script setup lang="ts">

import PostItem from "@/components/post/PostItem.vue";
import type {Page} from "@/types/models/page/page.model.ts";
import type {Post} from "@/types/models/post/post.model.ts";

defineProps<{
  paginatedPosts: Page<Post>
}>()
</script>

<template>
  <div v-for="post in paginatedPosts?.content" :key="post.id" class="w-full shadow-md p-3">
      <PostItem :post="post"/>
  </div>
</template>

<style scoped>

</style>