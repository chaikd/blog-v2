<template>
  <v-main>
    <v-container class="py-8">
      <!-- <h1 class="text-h3 font-weight-bold mb-6" style="color: #EF8080;">Blog Posts</h1> -->
      
      <!-- 前三个博客文章 -->
      <v-row class="mb-6">
        <v-col v-for="(post, index) in displayedPosts.slice(0, 3)" :key="post.id" :cols="index === 0 ? 12 : 6">
          <!-- :height="index === 0 ? 400 : 300" -->
          <v-card
            :elevation="4"
            @click="toDetail(post._id)"
          >
            <v-img :src="post.image" :height="index === 0 ? 250 : 150" cover></v-img>
            <v-card-title>{{ post.title }}</v-card-title>
            <v-card-subtitle>{{ post.date }}</v-card-subtitle>
            <v-card-text>
              <div class="text-truncate">{{ post.description }}</div>
              <v-chip
                v-for="tag in post.tags"
                :key="tag"
                class="mr-2 mt-2"
                small
                outlined
                color="#EF8080"
              >
                {{ tag }}
              </v-chip>
            </v-card-text>
            <!-- <v-card-actions>
              <v-btn text="Read More" color="#EF8080"></v-btn>
            </v-card-actions> -->
          </v-card>
        </v-col>
      </v-row>

      <!-- 剩余的博客文章 -->
      <v-row>
        <v-col v-for="post in displayedPosts.slice(3)" :key="post.id" cols="12" sm="6" md="4">
          <v-card
            height="300"
            :elevation="2"
            @click="toDetail(post.id)"
          >
            <v-img :src="post.image" height="150" cover></v-img>
            <v-card-title>{{ post.title }}</v-card-title>
            <v-card-subtitle>{{ post.date }}</v-card-subtitle>
            <v-card-text>
              <div class="text-truncate">{{ post.excerpt }}</div>
              <v-chip
                v-for="tag in post.tags"
                :key="tag"
                class="mr-2 mt-2"
                small
                outlined
                color="#EF8080"
              >
                {{ tag }}
              </v-chip>
            </v-card-text>
            <!-- <v-card-actions>
              <v-btn text="Read More" color="#EF8080"></v-btn>
            </v-card-actions> -->
          </v-card>
        </v-col>
      </v-row>

      <!-- 加载指示器 -->
      <div class="text-center mt-6">
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="#EF8080"
        ></v-progress-circular>
        <p v-if="allLoaded" class="text-subtitle-1">没有更多了</p>
      </div>
    </v-container>
  </v-main>
</template>
<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import * as articleHttp from '@/http/api/article'

const displayedPosts: Ref = ref([])
const loading = ref(false)
const pagination = reactive({
  size: 10,
  currentPage: 1,
  total: 1
})
const allLoaded = computed(() => displayedPosts.value.length === pagination.total)
const router = useRouter()

const loadMore = async () => {
  if (loading.value || allLoaded.value) return

  loading.value = true
  // await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call
  // const newPosts = allPosts.value.slice(displayedPosts.value.length, displayedPosts.value.length + 3)
  // displayedPosts.value.push(...newPosts)
  const res: any = await articleHttp.getList({
    ...pagination,
    total: undefined
  })
  res.content = res.content.map((v: {
    createTime: number,
    cover: string,
    tag: string
  }, k: number) => {
    return {
      ...v,
      date: new Date(v.createTime).toLocaleString(),
      // image: 'https://picsum.photos/400/200?random=' + k,
      image: v.cover || `https://picsum.photos/800/300?random=${k}`,
      tags: [v.tag]
    }
  })
  pagination.total = res.total
  displayedPosts.value.push(...res.content)
  loading.value = false
}

const handleScroll = () => {
  const scrollPosition = window.innerHeight + window.scrollY
  const documentHeight = document.documentElement.offsetHeight
  if (scrollPosition >= documentHeight - 200 && !loading.value && !allLoaded.value) {
    loadMore()
  }
}

const toDetail = (id: string) => {
  router.push(`/article/${id}`)
}

onMounted(() => {
  loadMore()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
