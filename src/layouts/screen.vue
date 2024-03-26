<script lang="ts" setup></script>

<template>
  <div class="screen"></div>
</template>

<style lang="scss">
.screen {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000000009;
  background: url("@/assets/common/screen.png");
  background-size: cover;
}
</style>
