<template>
  <div class="alert" v-if="visible">{{props.message}}</div>
</template>
<script setup>
  const props = defineProps({
    message: {
      type: string,
      default: ''
    }
  })
  const visible = ref(false)
  function open() {
    visible.value = true
  }
  function close() {
    visible.value = false
  }
  defineExpose({  
    open,
    close
  })
</script>
<style lang="scss" scoped>
.alert{
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>