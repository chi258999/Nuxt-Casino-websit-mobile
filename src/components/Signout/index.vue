<script lang="ts" setup>
import router from "@/router";
import { authStore } from "@/store/auth";
import { useI18n } from "vue-i18n";
import { resetAllStores } from "@/store";
import { ref, computed, watch, onMounted } from "vue";
import { useDisplay } from 'vuetify';
const { name, width } = useDisplay();
const mobileWidth = computed(() => {
  return width.value
})

const props = defineProps({
  signoutDialog: {
    type: Boolean,
  },
});

const emit = defineEmits(["update:signoutDialog", 'close']);

const signoutDialog = computed({
  get() {
    return props.signoutDialog;
  },
  set(val) {
    emit("update:signoutDialog", val);
  },
});

const { t } = useI18n();
const { dispatchSignout } = authStore();

const signOut = (): void => {
  emit("close");
  dispatchSignout();
  console.log("signout");
  resetAllStores();
  router.push({ name: "Dashboard" });
};
</script>

<template>
  <v-dialog
    v-model="signoutDialog"
    :width="mobileWidth < 600 ? 328 : 471"
    :scrim="true"
    @click:outside="$emit('close')"
  >
    <div class="signout-container">
      <div class="header">
        <img src="@/assets/public/image/img_public_03.png" class="logout-logo" />
        <p class="text-700-20 white">{{ t("signout.text_1") }}</p>
      </div>
      <p class="signout-text">{{ t("signout.text_2") }}</p>
      <p class="signout-notice">{{ t("signout.text_3") }}</p>
      <v-row class="my-12 justify-center">
        <v-btn
          class="signout-btn button-bright text-none"
          width="-webkit-fill-available"
          height="60px"
          @click="signOut"
        >
          {{ t("signout.button") }}
        </v-btn>
      </v-row>
      <v-btn class="close-button" icon="true" @click="$emit('close')">
        <v-icon color="#FFFFFF"> mdi-close </v-icon>
      </v-btn>
    </div>
  </v-dialog>
</template>

<style lang="scss">
// container
.signout-container {
  background-color: #2e274c;
  border-radius: 16px !important;

  .header {
    text-align: center;
    background: linear-gradient(180deg, #8218ea 0%, #2c549c 100%);
    border-radius: 16px 16px 0px 0px;
    height: 294px;

    .logout-logo {
      margin-top: -10px;
      width: 270px;
    }

    .logo-text {
      color: white;
      font-size: 20px;
      font-weight: 700;
      padding: 12px 80px 28px 80px;
      margin: 0;
    }
  }

  .signout-text {
    margin: 50px 120px 0 120px;
    color: white;
    font-size: 28px;
    font-weight: 700;
  }

  .signout-notice {
    margin: 56px 53px 0 53px;
    color: white;
    font-size: 16px;
  }

  .signout-btn {
    width: 375px !important;
  }

  // close modal button
  .close-button {
    box-shadow: none !important;
    background-color: transparent !important;
    position: absolute !important;
    top: 5px;
    right: 5px;
  }
}
</style>
