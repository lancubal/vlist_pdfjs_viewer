<template>
  <div>
    <PDFViewer v-if="mountViewer" widthValue="960" :cantidadDePaginas="cantidadDePaginas" :pageRatio="ratioNuevo"/> 
    <!-- <virtualList /> -->
  </div>
</template>

<script setup>
import PDFViewer from './components/pdfViewer.vue'
import virtualList from './components/virtualList.vue'

import * as pdfjsLib from "pdfjs-dist";
import { onMounted, ref, computed } from "vue";

import store from "./store";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/lib/pdf.worker.js";

let cantidadDePaginas = ref(0);
const paginas = computed(() =>
  Array.from(Array(cantidadDePaginas.value).keys())
);

let mountViewer = ref(null)
let ratioNuevo = ref(null)

let pageRatio = ref(1);

async function getPdf() {
  var loadingTask = pdfjsLib.getDocument("testa.pdf");
  loadingTask.promise.then(
    function (pdf) {
      console.log("PDF loaded");
      store.commit("setDocumento", pdf);
      cantidadDePaginas.value = pdf.numPages;
      pdf.getPage(1).then(function (page) {
        var scale = 1;
        var viewport = page.getViewport({ scale: scale });
        pageRatio.value = viewport.height / viewport.width;
        console.log("pageRatio", pageRatio.value);
        store.commit('setRatio',viewport.height / viewport.width)
        mountViewer.value = true
        ratioNuevo.value = viewport.height / viewport.width;
      });
    },
    function (error) {
      console.error("Error cargando PDF", error);
    }
  );
}

getPdf();



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
