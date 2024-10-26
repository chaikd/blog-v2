<template>
  <template v-for="item in props.datas?.content" :key="item.title">
    <v-card
      class="mt-3"
      :loading="false"
      :title="item.title"
      :subtitle="item.description"
      :text="item.content"
    >
      <v-card-actions>
        <v-btn @click="edit(item._id)">编辑</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  <v-pagination
    v-model="page"
    :length="pageLength"
    class="my-4"
  ></v-pagination>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue';

const emits = defineEmits(['edit', 'pageChange'])
const props = defineProps({
  datas: Object,
})
const page = ref(props.datas?.currentPage)
watch(() => page, () => {
  emits('pageChange', page)
})
const pageLength = computed(() => Math.floor((props.datas?.total || 0)/(props.datas?.size || 0)) + 1)
function edit(id: any) {
  emits('edit', id)
}
</script>
