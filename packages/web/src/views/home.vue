<template>
  <v-parallax
    class="parallax bg-main"
    src="https://picsum.photos/1920/1080?random"
    :height="600"
  >
    <div class="d-flex flex-column fill-height justify-center align-center text-white">
      <h1 class="text-h2 font-weight-thin mb-4">不负今日</h1>
      <h4 class="subheading">终日之思不如须臾之所学也</h4>
    </div>
  </v-parallax>
  <v-main class="tw-pb-10">
    <v-container>
      <div class="tw-flex tw-justify-between tw-items-center my-5 color-main">
        <span class="text-h4 font-weight-bold">最新文章</span>
        <routerLink to="/article">
          <span>查看更多</span>
        </routerLink>
      </div>
      <v-row>
        <v-col v-for="article in latestArticles" :key="article.id" cols="12" md="4">
          <v-card
            class="mx-auto"
            max-width="400"
            :class="{ 'on-screen': inViewport.blog }"
            v-intersect="onBlogIntersect"
            >
            <v-img
              class="white--text align-end"
              height="200px"
              :src="article.image"
            >
              <v-card-title class="color-main">{{ article.title }}</v-card-title>
            </v-img>
            <v-card-subtitle class="pb-0">
              {{ article.date }}
            </v-card-subtitle>
            <v-card-text>
              <v-chip
                v-for="tag in article.tags"
                :key="tag"
                class="mr-2 mt-2"
                small
                outlined
                color="#EF8080"
              >
                {{ tag }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- 最新图片模块 -->
    <v-container>
      <v-responsive class="mx-auto mt-16 tw-pb-10" max-width="1200">
        <div class="tw-flex tw-justify-between tw-items-center my-5 color-main">
          <span class="text-h4 font-weight-bold mb-8 px-4">图片</span>
          <routerLink to="/album">
            <span>查看更多</span>
          </routerLink>
        </div>
        <v-row class="px-4">
          <v-col v-for="(image, index) in latestImages" :key="index" cols="12" sm="6" md="4">
            <v-card
              class="mx-auto"
              :class="{ 'on-screen': inViewport.picture }"
              v-intersect="onPictureIntersect"
              elevation="2"
            >
              <v-img
                :src="image.url"
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="#EF8080"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
              <v-card-text>
                <div class="text-subtitle-1 font-weight-medium mb-2 color-main">{{ image.title }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive, onBeforeMount } from 'vue'
import * as homeHttp from '@/http/api/home'

const lastScrollPosition = ref(0)
let inViewport = reactive({
  blog: false,
  picture: false
})

let latestArticles = ref([
  {
    id: 1,
    title: '',
    image: 'https://picsum.photos/400/200?random=1',
    date: '',
    tags: [],
  },
  {
    id: 2,
    title: '',
    image: 'https://picsum.photos/400/200?random=2',
    date: '',
    tags: [],
  },
  {
    id: 3,
    title: '',
    image: 'https://picsum.photos/400/200?random=3',
    date: '',
    tags: [],
  },
])

let latestImages = ref([
  {
    url: 'https://picsum.photos/400/400?random=1',
    title: 'Serene Landscape',
    category: 'Nature',
  },
  {
    url: 'https://picsum.photos/400/400?random=2',
    title: 'Urban Architecture',
    category: 'City',
  },
  {
    url: 'https://picsum.photos/400/400?random=3',
    title: 'Abstract Art',
    category: 'Art',
  },
  {
    url: 'https://picsum.photos/400/400?random=4',
    title: 'Wildlife Close-up',
    category: 'Animals',
  },
  {
    url: 'https://picsum.photos/400/400?random=5',
    title: 'Culinary Delight',
    category: 'Food',
  },
  {
    url: 'https://picsum.photos/400/400?random=6',
    title: 'Vintage Technology',
    category: 'Tech',
  },
])

const onScroll = () => {
  const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
  if (currentScrollPosition < 0) {
    return
  }
  if (Math.abs(currentScrollPosition - lastScrollPosition.value) < 60) {
    return
  }
  // showAppBar.value = currentScrollPosition < lastScrollPosition.value
  lastScrollPosition.value = currentScrollPosition
}

const onBlogIntersect = (entries) => {
  inViewport.blog = entries
}
const onPictureIntersect = (entries) => {
  inViewport.picture = entries
}

const getData = () => {
  homeHttp.getDatas().then(res => {
    latestArticles.value = res.article.map((v, k) => {
      return {
        ...v,
        date: new Date(v.createTime).toLocaleString(),
        // image: 'https://picsum.photos/400/200?random=' + k,
        image: v.cover || `https://picsum.photos/400/200?random=${k}`,
        tags: [v.tag]
      }
    })
    latestImages.value = res.album.map(v => {
      return {
        url: v.imgUrl,
        title: v.name.split('.')[0]
      }
    })
  })
}

onBeforeMount(() => {
  getData()
})
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

.v-card {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  opacity: 0;
  transform: translateY(20px);
}

.v-card.on-screen {
  opacity: 1;
  transform: translateY(0);
}
.v-app-bar.v-toolbar {
  background: rgba(255,255,255,.1);
}
</style>
