<script lang="ts" setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

</script>

<template>
  <div class="first">
    <img src="@/assets/first-animation.gif" alt="">
  </div>
</template>

<style lang="scss" scoped>
.first {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100VH;
  background: #15161c;
  z-index: 1000000008;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100px;
  }
}

</style>
