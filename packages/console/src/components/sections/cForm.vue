<template>
  <v-form ref="form" fast-fail @submit.prevent="submit">
    <template v-for="item in formConfig" :key="item.prop">
      <template v-if="item.type === 'input'">
        <v-text-field
          v-model="formData[item.prop]"
          :rules="item.rules"
          :label="item.label"
        ></v-text-field>
      </template>
      <template v-if="item.type === 'select'">
        <v-select
          v-model="formData[item.prop]"
          :items="item.options"
          :rules="item.rules"
          :label="item.label"
        ></v-select>
      </template>
      <template v-if="item.type === 'markdown'">
        <markdown v-model="formData[item.prop]"></markdown>
      </template>
      <template v-if="item.type === 'switch'">
        <v-switch
          v-model="formData[item.prop]"
          :label="item.label"
          :value="1"
          color="info"
        ></v-switch>
      </template>
    </template>
    <v-btn width="200" class="mt-2 mx-auto" type="submit" block>提交</v-btn>
  </v-form>
</template>
<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import markdown from './markdown.vue';

const props = defineProps(['formData', 'formConfig'])
const emits = defineEmits(['submit'])
const form = useTemplateRef('form')
async function submit() {
  const result: {
    valid: boolean;
    errors: {
        id: number | string;
        errorMessages: string[];
    }[];
  } | undefined = await form.value?.validate()
  if (result?.valid) {
    emits('submit', props.formData)
  }
}
function resetFormData() {
  form.value?.reset()
}
defineExpose({
  resetFormData
})
</script>