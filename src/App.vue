<template>
  <div>
    <PDFViewer widthValue="960"/> 
    <!-- <virtualList /> -->
  </div>
</template>

<script setup>
import PDFViewer from './components/pdfViewer.vue'
import virtualList from './components/virtualList.vue'
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
