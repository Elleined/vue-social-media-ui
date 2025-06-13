<script setup lang="ts">

import PostItem from "@/components/post/PostItem.vue";
</script>

<template>

  <Dialog v-model:visible="commentDialogVisible" modal :header="author.first_name + '\'s Post'" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <PostItem :post="post" />
    <header class="max-w-3xl mx-auto bg-white rounded-2xl p-4 space-y-4 mb-5 mt-4">
      <form class="flex justify-center items-center gap-4" @submit.prevent="saveComment()">
        <Avatar image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" shape="circle" size="large"/>
        <FloatLabel>
          <InputText id="content" v-model="commentContent" required/>
          <label for="content">Comment as </label>
        </FloatLabel>
        <FileUpload mode="basic" @select="previewImage" customUpload auto severity="secondary" class="p-button-outlined" />
        <Button type="submit" variant="outlined" severity="success" rounded icon="pi pi-send"/>
      </form>
      <div class="card flex flex-wrap justify-center gap-4">
        <Image v-if="commentPreview" :src="commentPreview" alt="Image" width="250" preview/>
      </div>
    </header>
  </Dialog>
</template>

<style scoped>

</style>