<template>
  <v-responsive class="border rounded">
    <v-app :theme="theme">
      <v-app-bar>
        <div class="tw-w-full px-3 d-flex justify-space-between">
          <div>
            <template v-for="item in menus">
              <v-btn :text="item.label" @click="goto(item.path)"></v-btn>
            </template>
          </div>
          <div>
            <v-btn
              :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'"
              text="切换主题"
              slim
              @click="onClick"
            ></v-btn>
          </div>
        </div>
      </v-app-bar>
      <v-main class="overflow-y-auto">
        <v-container>
          <RouterView></RouterView>
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>
<script setup lang="ts">
  import { RouterView, useRouter } from 'vue-router'
  import { reactive, ref } from 'vue'

  const theme = ref('light')
  const router = useRouter()
  const menus = reactive([
    {
      label: '文章',
      path: '/article'
    },
    {
      label: '标签',
      path: '/tag'
    },
    // {
    //   label: '图集',
    //   path: ''
    // },
  ])

  function onClick () {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
  function goto(path: string) {
    router.push(path)
  }
</script>
<style lang="scss">
@use '@/style/globalBase.scss';

</style>
