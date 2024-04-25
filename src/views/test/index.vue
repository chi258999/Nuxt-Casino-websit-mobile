<script lang="ts" setup>
import { ref, onMounted, defineAsyncComponent } from "vue";
const MSearch = defineAsyncComponent(() => import("@/components/global/search/mobile/index.vue"));

onMounted(() => {});
</script>

<template>
  <div class="test-container">
    <!-- <img src="https://pix.kim/res/game/BGAMING/56469862184124429.jpg" alt="Image" /> -->
    <MSearch></MSearch>
  </div>
</template>

<style lang="scss">
.test-container {
  // width: 300px;
  /* Set the desired width of the container */
  // height: 200px;
  /* Set the desired height of the container */
  height: 100vh;
  overflow: hidden;
}

.image-container img {
  object-fit: none;
  object-position: -50px -100px;
  /* Adjust the values to position the specific area */
  width: 100%;
  height: 100%;
}
</style>
