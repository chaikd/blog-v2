<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-sheet class="login-box tw-absolute mx-auto">
    <v-form ref="form" fast-fail @submit.prevent="submit">
      <template v-for="item in formConfig" :key="item.prop">
        <v-text-field
          v-model="formData[item.prop]"
          :rules="item.rules"
          :label="item.label"
          :type="item.type"
        ></v-text-field>
      </template>
      <v-btn class="mt-2" type="submit" block>提交</v-btn>
    </v-form>
  </v-sheet>
</template>
<script setup lang="ts">
import {reactive, useTemplateRef} from 'vue'
import * as authHttp from '@/http/api/auth'
import { useRouter } from 'vue-router';
const formConfig = reactive([
  {
    prop: 'userName',
    label: '用户名',
    type: 'input',
    rules: [
      (v: String) => !!v || '请输入用户名'
    ],
  },
  {
    prop: 'password',
    label: '密码',
    type: 'password',
    rules: [
      (v: String) => !!v || '请输入密码'
    ]
  },
])
const formData: any = reactive({
  userName: '',
  password: ''
})
const form = useTemplateRef('form')
const router = useRouter()
async function submit() {
  const result: {
    valid: boolean;
    errors: {
        id: number | string;
        errorMessages: string[];
    }[];
} | undefined = await form.value?.validate()
  if (result?.valid) {
    authHttp
      .login({ userName: formData.userName, password: formData.password })
      .then(() => {
        router.push('/article');
      })
  }
}
</script>
<style scoped lang="scss">
.login-box{
  width: 30%;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
</style>