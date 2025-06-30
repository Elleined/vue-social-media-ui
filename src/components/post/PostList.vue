<script setup lang="ts">

import PostItem from "@/components/post/PostItem.vue";
import type Page from "@/types/paging/Page.ts";
import type {Post} from "@/types/model.d.ts";

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