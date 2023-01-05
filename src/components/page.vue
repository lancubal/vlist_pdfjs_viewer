<template>
    <div class="page">
        <canvas :id="'the-canvas' + props.numPagina" class="canvas"></canvas>
    </div>
</template>

<script setup>
import * as pdfjsLib from "pdfjs-dist";

import { onMounted, toRaw } from "vue";
import store from "../store";
const props = defineProps(['numPagina'])

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "/lib/pdf.worker.js";

onMounted(() => {
  renderPage();
});

async function renderPage() {
  
  const rawObjectOrArray = toRaw(store.state.documento);
  console.log(props.numPagina + 1)
      rawObjectOrArray.getPage(props.numPagina+1).then(function (page) {
        store.commit("setPage", page);

        var scale = 1.75;
        var viewport = page.getViewport({ scale: scale });

        var canvas = document.getElementById("the-canvas" + props.numPagina);
        var context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        var renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          console.log("Page rendered");
        });
      });
}

</script>

<style lang="scss">
.canvas{
  width: 800px;
  padding: 5px 0;
}

</style>