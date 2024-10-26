<template>
  <v-main>
    <v-container class="py-8">
      <!-- 文章标题 -->
      <h1 class="text-h3 font-weight-bold mb-6" style="color: #EF8080;">{{ article.title }}</h1>
      
      <!-- 文章元数据 -->
      <v-row class="mb-6">
        <v-col cols="12" sm="3">
          <v-icon color="#EF8080" class="mr-2">mdi-account</v-icon>
          <span class="text-subtitle-1">{{ article.author }}</span>
        </v-col>
        <v-col cols="12" sm="3">
          <v-icon color="#EF8080" class="mr-2">mdi-calendar</v-icon>
          <span class="text-subtitle-1">{{ article.date }}</span>
        </v-col>
        <v-col cols="12" sm="3">
          <v-icon color="#EF8080" class="mr-2">mdi-clock-outline</v-icon>
          <span class="text-subtitle-1">{{ article.readTime }} min read</span>
        </v-col>
        <v-col cols="12" sm="3">
          <span
            v-for="tag in article.tags"
            :key="tag"
            class="color-main"
          >{{ tag }}</span>
          <!-- <v-chip
            v-for="tag in article.tags"
            :key="tag"
            class="mr-2 mt-2"
            small
            outlined
            color="#EF8080"
          >
            {{ tag }}
          </v-chip> -->
        </v-col>
      </v-row>

      <!-- 文章封面图 -->
      <v-img
        :src="article.image"
        :aspect-ratio="16/9"
        class="rounded-lg mb-6"
        cover
      ></v-img>

      <!-- 文章内容 -->
      <v-card class="pa-6">
        <!-- <div v-html="article.content" class="article-content"></div> -->
        <mavon-editor
          v-model="article.content"
          previewBackground="#fff"
          :boxShadow="false"
          :toolbarsFlag="false"
          :subfield="false"
          defaultOpen="preview"
        />
      </v-card>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import * as articleHttp from '@/http/api/article'
import { useRoute } from 'vue-router'

interface Article {
  createTime?: number,
  author?: string,
  date?: string,
  readTime?: number,
  tags?: Array<string>,
  image?: string,
  content?: string,
  title?: string,
}
const article: Ref<Article> = ref({})
const route = useRoute()

const getDetail = () => {
  articleHttp.getOne((route.params.id as string)).then((res: any) => {
    let {
      createTime,
      tag,
      cover,
      codeHtml,
    } = res
    article.value = {
      ...res,
      author: 'chaikd',
      date: new Date(createTime).toLocaleString(),
      readTime: Math.floor((res.content.length / 350 > 1 ? Math.round(res.content.length / 400) : 1) / 60),
      tags: [tag],
      content: codeHtml,
      image: cover || `https://picsum.photos/800/300?random=0`
    }
  })
}

onMounted(() => {
  getDetail()
})
</script>

<style scoped lang="scss">
@import '@/style/globalBase.scss';
.article-content {
  font-size: 1.1rem;
  line-height: 1.6;
}

.article-content h2 {
  color: #EF8080;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
}

.article-content p {
  margin-bottom: 1em;
}

.article-content ul {
  margin-bottom: 1em;
  padding-left: 1.5em;
}

.article-content pre {
  background-color: #f5f5f5;
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
}

.article-content code {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9em;
}
</style>