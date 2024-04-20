<template>
  <v-navigation-drawer
    v-model="modelValueNew"
    location="top"
    class="m-grecaptcha-drawer"
    temporary
    :touchless="true"
    :style="{
        height: 'unset',
        top: '0px',
        zIndex: 9147483646,
        background: 'unset !important',
      }"
  >
    <div class="m-grecaptcha-body">
      <div class="text-700-14 white text-center title">Tell us you are human</div>
      <v-card class="m-grecaptcha-detail-card mt-2 pa-1">
        <div class="grecaptcha"  id="grecaptcha"></div>
      </v-card>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from "vue";
const props = defineProps({
  modelValue: {
    type: Boolean
  },
  id: {
    type: String
  }
});

const emit = defineEmits(["update:modelValue"]);

const modelValueNew = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  }
});

const sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"

// 关闭弹窗
const handleClose = () => {
  emit("update:modelValue", false);
};

onMounted(async () => {
  setTimeout(() => {
        window.grecaptcha.render("grecaptcha", {
          sitekey: sitekey,
          callback:handleClose
        });
      }, 200);
});
</script>

<style lang="scss">
.m-grecaptcha-body {
  height: 160px;
  background: #1d2027 !important;
  .title {
    padding-top: 12px;
  }
  .m-grecaptcha-detail-card {
    border-radius: 8px !important;
    background: var(--grade-1-black, #15161c) !important;
    // height: 80px;
    margin: 12px;
  }
}
</style>