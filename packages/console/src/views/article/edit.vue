<template>
  <articleForm :formData="data" @submit="submit"></articleForm>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as articleHttp from '@/http/api/console/article'
import { useRoute, useRouter } from 'vue-router';
import articleForm from './articleForm.vue';

let data = ref({})
const route = useRoute()
const router = useRouter()
onMounted(() => {
  getData(route.params.id)
})
function getData(id: string | any) {
  articleHttp.getOne(id).then((res: any) => {
    data.value = res
  })
}
function submit(v: any, cb: Function) {
  const formData = new FormData()
  formData.append("_id", v._id)
  formData.append("codeHtml", v.content)
  formData.append("content", v.content)
  formData.append("title", v.title)
  formData.append("tag", v.tag)
  formData.append("publish", v.publish)
  formData.append("canReply", v.canReply)
  formData.append("cover", v.cover)
  formData.append("description", v.description)
  articleHttp.update(formData).then((res) => {
    cb()
    data.value = {}
    router.push('/article')
  });
}
</script>