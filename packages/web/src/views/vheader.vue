<template>
    <!-- 导航栏 -->
    <v-app-bar
      class="tw-pt-0"
      :elevation="0"
      :class="{ 'tw-hidden': !showAppBar }"
    >
      <v-container class="d-flex align-center">
        <v-app-bar-title class="text-h6 font-weight-bold color-main">
          chaikd的博客
        </v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn v-for="item in menuItems" :key="item.title" text :to="item.path">
          {{ item.title }}
        </v-btn>
      </v-container>
    </v-app-bar>
</template>

<script>
export default {
  name: 'Vheader'
}
</script>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'

const showAppBar = ref(true)
const lastScrollPosition = ref(0)

const menuItems = [
  { title: '首页', path: '/' },
  { title: '文章', path: '/article' },
  { title: '图集', path: '/album' },
  { title: '关于我', path: '/about' },
]

const onScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  if (currentScrollPosition < 0) {
    return
  }
  if (Math.abs(currentScrollPosition - lastScrollPosition.value) < 60) {
    return
  }
  showAppBar.value = currentScrollPosition < lastScrollPosition.value
  lastScrollPosition.value = currentScrollPosition
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
@import '@/style/globalBase.scss';
.v-app-bar--hide {
  transform: translateY(-100%);
}

.v-app-bar {
  transition: transform 0.3s ease-in-out;
}

.v-app-bar.v-toolbar {
  background: rgba(255,255,255,.1);
}
</style>