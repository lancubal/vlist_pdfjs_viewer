<template>
  <div class="pdfViewer">
    <div class="toolbar">
      <div class="toolbar-container">
        
      </div>
    </div>  
    <div v-bind="containerProps" id="scrollPanel" class="containerProps pdfScroll">
      <div v-bind="wrapperProps" class="wrapperProps">
        <Page v-for="item in list" :key="item.index" :numPagina="item.index" :style="{height: pageHeight.value + 'px'}" />
      </div>
    </div>
  </div>
</template>

<script setup>
import * as pdfjsLib from "pdfjs-dist";

import { onMounted, ref, computed } from "vue";
import { useVirtualList } from "@vueuse/core";

import Page from "./page.vue";

import store from "../store";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/lib/pdf.worker.js";

let pageHeight = ref(1200)
let pageWidth = ref(1000)

let cantidadDePaginas = ref(0);
const paginas = computed(() =>
Array.from(Array(cantidadDePaginas.value).keys())
);


const { list, containerProps, wrapperProps } = useVirtualList(paginas, {
  itemHeight: 1386,
});

onMounted(() => {
  getPdf();
});

async function getPdf() {
  var loadingTask = pdfjsLib.getDocument("test.pdf");
  loadingTask.promise.then(
    function (pdf) {
      console.log("PDF loaded");
      store.commit("setDocumento", pdf);
      cantidadDePaginas.value = pdf.numPages

       pdf.getPage(1).then(function (page) {
        store.commit("setPage", page);

        var scale = 1.75;
        var viewport = page.getViewport({ scale: scale });

        pageHeight.value =  viewport.height;
        pageWidth.value = viewport.width;

      }); 
    },
    function (error) {
      console.error("Error cargando PDF", error);
    }
  );
}
</script>

<style lang="scss" scoped>

.pdfViewer{
  width: 960px;
  border: solid 1px;
  height: 75vh;
}

.toolbar {
  width: 100%;
  background-color: #F9F9FB;
  height: 30px;
  border-bottom: solid 1px #E1E1E3;
}

.toolbar-container{
  width: 96%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pdfScroll {
  width: 100%;
  height: 72vh;
  margin: 0px;
  background-color: #EDECF0;
}

.containerProps {
  width: 960px;
}
.wrapperProps {
  width: 960px;
}
</style>