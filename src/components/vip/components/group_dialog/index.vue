<script lang="ts" setup>
import { computed } from "vue";
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
});

const emit = defineEmits(["update:modelValue", "dialogHandle"]);

const modelValueNew = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});

const closeGroupDialog = () => {
  emit("update:modelValue", false);
};
</script>

<template>
  <v-dialog v-model="modelValueNew" @click:outside="closeGroupDialog">
    <div>
      
    </div>
  </v-dialog>
</template>

<style lang="scss"></style>
