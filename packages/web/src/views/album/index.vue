<template>
  <v-main>
    <v-container class="py-8">
      <!-- <h1 class="text-h3 font-weight-bold mb-6" style="color: #EF8080;">Photo Albums</h1> -->
      
      <!-- 图集列表 -->
      <v-row>
        <v-col v-for="album in albums" :key="album._id" cols="12" sm="6" md="4">
          <v-card @click="openAlbum(album)" class="album-card" elevation="2" hover>
            <v-img :src="album.cover" height="200" cover class="align-end">
              <v-card-title class="color-main">{{ album.title }}</v-card-title>
            </v-img>
            <v-card-text>
              <div>{{ album.description }}</div>
              <div class="mt-2">
                <v-icon small color="#EF8080" class="mr-1">mdi-image</v-icon>
                <span>{{ album.photos?.length }} photos</span>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
  <!-- 图片预览对话框 -->
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="#EF8080">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ selectedAlbum.title }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text class="pa-0">
        <v-carousel v-if="selectedAlbum" height="calc(100vh - 64px)" hide-delimiter-background show-arrows-on-hover>
          <v-carousel-item v-for="(photo, i) in selectedAlbum.photos" :key="i">
            <v-sheet height="100%" tile>
              <v-row class="fill-height" align="center" justify="center">
                <v-img :src="photo.url" max-height="90vh" contain>
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="#EF8080"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue'
import * as albumHttp from '@/http/api/album'

let albums: Ref<Array<{
  _id?: string,
  cover?: string,
  title?: string,
  description?: string,
  photos?: Array<{url: string}>
}>> = ref([])

const dialog = ref(false)
const selectedAlbum: any = ref({})

const openAlbum = (album: Object) => {
  selectedAlbum.value = album
  dialog.value = true
}

const getAlbum = (parentId: string | number) => {
  albumHttp.getAlbum(parentId).then((res: any) => {
    albums.value = res.map(((v: any, k: number) => {
      let {
        name,
        childrenList = []
      } = v
      const data = {
        ...v,
        title: name,
        cover: v.imgUrl || childrenList[0]?.imgUrl || 'https://picsum.photos/400/200?random=' + k,
        photos: childrenList.map((val: any) => ({url: val.imgUrl}))
      }
      return data
    }))
  })
}
onMounted(() => {
  getAlbum(0)
})
</script>

<style scoped>
@import '@/style/globalBase.scss';
.v-app-bar {
  transition: transform 0.3s ease-in-out;
}

.album-card {
  transition: transform 0.3s ease-in-out;
}

.album-card:hover {
  transform: translateY(-5px);
}
</style>