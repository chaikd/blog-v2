<script setup lang="ts">
import { RouterView } from 'vue-router'
import vheader from '@/views/vheader.vue'
</script>

<template>
  <v-app>
    <vheader></vheader>
    <RouterView />
  </v-app>
</template>

