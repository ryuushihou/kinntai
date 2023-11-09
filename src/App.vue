<template>
  <div>
    <p>勤務表</p>
    <DetailVue />
    <br />
    <el-button type="danger">PDF出力</el-button>
  </div>
</template>
<script setup lang="ts">
import DetailVue from './components/Detail.vue'
</script>
<style scoped lang="scss"></style>