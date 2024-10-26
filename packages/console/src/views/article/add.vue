<template>
  <articleForm :formData="data" @submit="submit"></articleForm>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import articleForm from './articleForm.vue';
import * as articleHttp from '@/http/api/console/article';
import { useRouter } from 'vue-router';

const data = reactive({
  publish: false
})
const router = useRouter()
function submit(v: any, cb: Function) {
  articleHttp.addData(v).then((res) => {
    cb()
    router.push({ path: "/article" });
  });
}
</script>