<template>
  <div>
    <v-btn @click="toAdd">新增</v-btn>
  </div>
  <cardList v-bind:datas="datas" @edit="toEdit" @pageChange="getData"></cardList>
</template>
<script setup lang="ts">
import cardList from '@/components/sections/cardList.vue';
import { useRouter } from 'vue-router';
import * as articleHttp from '@/http/api/console/article';
import { onMounted, ref } from 'vue';

const router = useRouter()
const pagenation = {
  total: 0,
  size: 10,
  currentPage: 1,
}
let datas = ref({})
onMounted(() => {
  getData()
})
function getData(currentPage?: number) {
  let pageData = {
    ...pagenation,
    currentPage: currentPage ? currentPage : pagenation.currentPage
  }
  articleHttp.getList(pageData).then((res: any) => {
    datas.value = {
      ...res
    }
  })
}
function toEdit(id: string) {
  router.push(`/article/${id}`)
}
function toAdd() {
  router.push('/article/add')
}
</script>