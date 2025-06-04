<script setup lang="ts">

import handleError from "@/utilities/AxiosErrorHandler.ts";
import {APIClientWithCredentials} from "@/utilities/APIClient.ts";
import {useToast} from "primevue";
import {onMounted, ref} from "vue";

const toast = useToast()

const posts = ref()

async function getAllPosts() {
  try {
    const { data } = await APIClientWithCredentials().get('/users/posts', {
      params: {
        page: 1,
        pageSize: 10,
        field: "created_at",
        sortBy: "desc",
        isDeleted: false,
      }
    })

    return data;
  } catch (e) {
    handleError(toast, e)
  }
}

onMounted(async () => {
  posts.value = await getAllPosts()
})
</script>

<template>
  {{ posts }}
  <Toast />
</template>

<style scoped>

</style>