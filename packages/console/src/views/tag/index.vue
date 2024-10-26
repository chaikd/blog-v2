<template>
  <v-dialog max-width="500" v-model="tagConfig.isActive">
    <template v-slot:activator="{ props: activatorProps }">
      <div>
        <v-btn @click="toAdd">新增</v-btn>
      </div>
    </template>
    <template v-slot:default="{ isActive }">
      <v-text-field
        v-model="tagConfig.name"
        label="标签名"
        required
      ></v-text-field>
      <v-btn class="mx-auto" width="200" @click="add">确认</v-btn>
    </template>
  </v-dialog>
  <template v-for="item in tagList">
    <div class="py-3 mr-3 float-left">
      <v-btn
        append-icon="mdi-account-circle"
        prepend-icon="mdi-check-circle"
      >
        <template v-slot:prepend>
          <v-icon color="success"></v-icon>
        </template>
        {{ item.name }}
        <template v-slot:append>
          <v-icon color="warning" icon="close"></v-icon>
        </template>
      </v-btn>
    </div>
  </template>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as tagHttp from '@/http/api/console/tags';

let tagList = ref<Array<{name: string}>>([])
let tagConfig = ref({
  isActive: false,
  name: ''
})
onMounted(() => {
  getTags()
})
function getTags() {
  tagHttp.getDatas().then((res: any) => {
    tagList.value = res
  })
}
function toAdd() {
  tagConfig.value.isActive = true
}
function add() {
  tagHttp
    .addData({ name: tagConfig.value.name })
    .then((res) => {
      tagConfig.value.name = ''
      tagConfig.value.isActive = false
      getTags()
    })
}
</script>