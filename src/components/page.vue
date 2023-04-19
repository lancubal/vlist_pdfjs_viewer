<template>
    <div class="page">
        <canvas :id="'the-canvas' + props.numPagina" class="canvas" ></canvas>
    </div>
</template>

<script setup>
import * as pdfjsLib from "pdfjs-dist";
import debounce from "@/helpers/debounce";

import { onMounted, toRaw, onUnmounted } from "vue";
import store from "../store";
const props = defineProps(['numPagina','height','width'])

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "/lib/pdf.worker.js";

onMounted(() => {
  renderPage_debounced()
  let pageElement = document.querySelector("#the-canvas" + props.numPagina)
  pageElement.style.width = props.width + 'px' 
  pageElement.style.height = props.height + 'px' 
});

let renderPage_debounced = debounce(renderPage,500)

onUnmounted(() => {
  console.log("Unmounted page " + (props.numPagina + 1))
});

async function renderPage() {
  const rawObjectOrArray = toRaw(store.state.documento);
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
          console.log("Page rendered " + (props.numPagina + 1));
        });
      });
}

</script>

<style lang="scss">

.canvas{
  padding: 5px 0;
}


</style>