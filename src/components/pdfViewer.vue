<template>
  <div class="pdfViewer">
    <div class="toolbar">
      <div class="toolbar-container"></div>
    </div>
    <div
      v-bind="containerProps"
      id="scrollPanel"
      class="containerProps pdfScroll"
    >
      <div v-bind="wrapperProps" class="wrapperProps">
        <Page
          :height="pageHeigth"
          :width="pageWidth"
          class="page"
          v-for="item in list"
          :key="item.index"
          :numPagina="item.index"
        />
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
const props = defineProps(["widthValue", "cantidadDePaginas", "pageRatio"]);

const paginas = computed(() =>
  Array.from(Array(props.cantidadDePaginas).keys())
);

let pageWidth = props.widthValue *0.8;

onMounted(() => {
  document.querySelector(".pdfViewer").style.width = props.widthValue + "px";
  document.querySelector(".containerProps").style.width =
    props.widthValue + "px";
});

let pageHeigth = pageWidth * props.pageRatio + 10;

const { list, containerProps, wrapperProps } = useVirtualList(paginas, {
  itemHeight: pageHeigth,
});
</script>

<style lang="scss" scoped>
.pdfViewer {
  border: solid 1px;
  height: 75vh;
}

.toolbar {
  width: 100%;
  background-color: #f9f9fb;
  height: 30px;
  border-bottom: solid 1px #e1e1e3;
}

.toolbar-container {
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
  background-color: #edecf0;
}
</style>