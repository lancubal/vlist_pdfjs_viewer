<template>
    <div v-bind="containerProps" class="containerProps">
        <div v-bind="wrapperProps" class="wrapperProps">
            <div
                v-for="{index,data} in list"
                :key="index"
                class="item"
                >
            <h2 class="index">Item #{{ index }}</h2>
            <p class="data">{{ data }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from "vue";
import { useVirtualList } from '@vueuse/core'

const data = ref(Array.from(Array(50).keys(), () => 'Lorem ipsum'))

const {list, containerProps, wrapperProps} = useVirtualList(data, {
    itemHeight: 96
})
</script>

<style lang="scss">
.containerProps{
height: 90vh;
border-radius: 25px;
}
.wrapperProps{
    max-width: 100%;
}
.item{
    border-radius: 25px;
    height: 80px;
    margin-bottom: 16px;
    background-color: gray;
    color: white;
}
.index{

}
.data{

}
</style>