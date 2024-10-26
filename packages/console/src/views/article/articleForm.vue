<template>
  <c-form ref="cform" :formData="props.formData" :formConfig="formConfig" @submit="submit"></c-form>
</template>
<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import cForm from '@/components/sections/cForm.vue';
import * as tagHttp from '@/http/api/console/tags';

const formConfig = reactive([
  {
    prop: 'title',
    label: '标题',
    type: 'input',
    rules: [
      ruleFn('标题')
    ]
  },
  {
    prop: 'cover',
    label: '封面',
    type: 'input',
    rules: [
      ruleFn('封面')
    ]
  },
  {
    prop: 'description',
    label: '简述',
    type: 'input',
    rules: [
      ruleFn('简述')
    ]
  },
  {
    prop: 'tag',
    label: '标签',
    type: 'select',
    options: [],
    rules: [
      ruleFn('标签')
    ]
  },
  {
    prop: 'content',
    label: '内容',
    type: 'markdown',
    rules: [
      ruleFn('内容')
    ]
  },
  {
    prop: 'publish',
    label: '是否发布',
    type: 'switch',
    rules: [
      ruleFn('是否发布')
    ]
  },
])
const props = defineProps(['formData'])
const emits = defineEmits(['submit'])
const cform = ref()

getOptions()
function submit(v: any) {
  emits('submit', v, () => {
    cform.value.resetFormData()
  })
}
function getOptions() {
  tagHttp.getDatas().then((res: any) => {
    let data = formConfig.find(v => v.prop === 'tag') || {options: []}
    data.options = res.map((v: {name: string}) => v.name);
  });
}
function ruleFn(label: string) {
  return (v: String) => !!v || '请输入' + label
}
</script>