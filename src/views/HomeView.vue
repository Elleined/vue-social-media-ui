<script setup lang="ts">
import {ref} from "vue";
import LogoutButton from "@/components/LogoutButton.vue";
import {postService} from "@/services/post/post.service.ts";
import {useToast} from "primevue";
import handleError from "@/utils/axios-error.util.ts";
import {fileClientService} from "@/services/file-client/file-client.service.ts";
import {keepPreviousData, useMutation, useQuery, useQueryClient} from "@tanstack/vue-query";
import {imageUtil} from "@/utils/image-preview.util.ts";
import type {PageRequest} from "@/types/request/page.request.ts";
import PostItem from "@/components/post/PostItem.vue";

const toast = useToast()
const queryClient = useQueryClient()

// for selected image preview
const preview = ref()

// for saving post
const content = ref<string>('')
const attachment = ref()

const request = ref<PageRequest>({
  page: 1,
  size: 10,
  field: "created_at",
  sortBy: "desc",
  isDeleted: false,
})

const postSaveMutation = useMutation({
  mutationFn: postService.save,
  onSuccess: (data: number) => {
    // get post by id
    // unshift the paginated post
    toast.add({severity: 'success', summary: 'Success Message', detail: `post saved successfully`, life: 1500});
    content.value = ''
    attachment.value = null
    preview.value = null
    queryClient.invalidateQueries({queryKey: ['paginatedPosts', request]})
  },
  onError: (error: Error) => {
    handleError(toast, error)
  }
})

const uploadMutation = useMutation({
  mutationFn: fileClientService.upload,
  onSuccess: (data: string) => {
    postSaveMutation.mutate({
      content: content.value,
      attachment: data
    })
  },
  onError: (error: Error) => {
    handleError(toast, error);
  }
})

function save() {
  if (!attachment.value) {
    postSaveMutation.mutate({
      content: content.value
    })
    return
  }

  uploadMutation.mutate({
    folder: "post",
    attachment: attachment.value,
  })
}

function previewAttachment(event: any): void {
  imageUtil.previewAttachment(event, attachment, preview);
}

function getAllQuery(request: PageRequest) {
  return useQuery({
    queryKey: ['paginatedPosts', request],
    queryFn: () => postService.getAll(request),
    placeholderData: keepPreviousData
  })
}

const {isPending, isError, data: paginatedPosts, error} = getAllQuery(request.value);

const nextPage = () => {
  request.value.page += 1;
};

const prevPage = () => {
  request.value.page -= 1;
};

</script>

<template>
  <Message severity="error" v-if="isError">
    {{ error?.message }}
  </Message>

  <template v-else>
    <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-4 space-y-4 mb-5 mt-4">
      <form class="flex justify-center items-center gap-4" @submit.prevent="save()">
        <FloatLabel>
          <InputText id="content" v-model="content" required/>
          <label for="content">What's on your mind?</label>
        </FloatLabel>
        <FileUpload mode="basic" @select="previewAttachment" customUpload auto severity="secondary"
                    class="p-button-outlined"/>
        <Button type="submit" label="Post" severity="success" rounded icon="pi pi-send"/>
      </form>
      <div class="card flex flex-wrap justify-center gap-4">
        <Image v-if="preview" :src="preview" alt="Image" width="250" preview/>
      </div>
      <div class="flex justify-between items-center">
        <Button type="button" label="Previous" severity="info" rounded icon="pi pi-angle-left" @click="prevPage"
                :loading="isPending" :disabled="!paginatedPosts?.has_previous"/>
        <Button type="button" label="Next" severity="info" rounded icon="pi pi-angle-right" iconPos="right"
                :loading="isPending" :disabled="!paginatedPosts?.has_next"
                @click="nextPage"/>
      </div>
    </div>

    <div>
      <div class='flex space-x-2 justify-center items-center bg-white h-screen dark:invert' v-if="isPending">
        <span class='sr-only'>Loading...</span>
        <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div class='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div class='h-8 w-8 bg-black rounded-full animate-bounce'></div>
      </div>
      <section class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-4 space-y-4" v-else>
        <div v-for="post in paginatedPosts?.content" :key="post.id" v-if="paginatedPosts?.content.length != 0"
             class="w-full shadow-md p-3">
          <PostItem :post="post"/>
        </div>
        <div v-else class="text-center font-bold font-italic text-2xl">No posts yet!</div>
      </section>
    </div>
  </template>
  <LogoutButton/>
  <Toast/>

</template>

<style scoped>

</style>