<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import icon_public_10 from "@/assets/public/svg/icon_public_10.svg";
import { useDisplay } from "vuetify";
import { storeToRefs } from 'pinia';
import { activityAppStore } from '@/store/activityApp';
const { setAppConfirmDialogShow } = activityAppStore();
import { toFormatNum } from '@/utils/numFormat';
import { useI18n } from "vue-i18n";
const { t } = useI18n();

// 获取平台货币
import { appCurrencyStore } from "@/store/app";
const platformCurrency = computed(() => {
  const { getPlatformCurrency } = storeToRefs(appCurrencyStore());
  return getPlatformCurrency.value;
});

const { name, width } = useDisplay();
const mobileWidth = computed(() => {
  return width.value;
});

const appConfirmDialogShow = computed(() => {
  const { getAppConfirmDialogShow } = storeToRefs(activityAppStore());
  return getAppConfirmDialogShow.value
})

const downloadLink = computed(() => {
  const { getDownloadLink } = storeToRefs(activityAppStore());
  return getDownloadLink.value;
});

// 安装 APP
const installAPP = () => {
  window.location.href = downloadLink.value
}

// 获取活动奖金
const activityAppBonus = computed(() => {
  const { getActivityBonus } = storeToRefs(activityAppStore());
  return getActivityBonus.value;
});

// 获取模式
const mobile = computed(() => {
  const { getMobile } = storeToRefs(activityAppStore());
  return getMobile.value;
});

</script>

<template>
  <div class="m-app" v-if="appConfirmDialogShow && mobileWidth < 600 && mobile">
    <v-btn
      class="m-app-confirm-drawer-close-button"
      icon="true"
      width="24"
      height="24"
      @click="setAppConfirmDialogShow(false)"
    >
      <inline-svg :src="icon_public_10" width="20" height="20"></inline-svg>
    </v-btn>

    <div>
      <p class="m-app-illustrate">{{ t('activity_app.text_2') }}</p>
      <p class="m-app-illustrate">{{ t('activity_app.text_3') }}</p>
      <p class="m-app-bonus">{{ platformCurrency }} {{ toFormatNum(activityAppBonus) }}</p>
      <p class="m-app-illustrate2">{{ t('activity_app.text_4') }}</p>
      <p class="m-app-illustrate2">{{ t('activity_app.text_5') }} <span>{{ t('activity_app.text_6') }}</span></p>

      <v-btn
        width="298"
        height="40"
        class="m-app-btn"
        @click="installAPP"
      >
        {{ t('activity_app.text_8') }}
      </v-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
.m-app {
  width: 100%;
  // height: 188px;
  position: fixed;
  bottom: 0;
  z-index: 10000;
  background-color: #10AB3B;
  background-image: url(@/assets/activity_app/activity-bg.svg);
  background-size: cover;
  padding: 16px 8px 24px 24px;

  .m-app-confirm-drawer-close-button {
    box-shadow: none !important;
    background-color: transparent !important;
    position: absolute !important;
    top: 8px;
    right: 8px;
    z-index: 100000;
  }

  .m-app-illustrate {
    font-weight: 900;
    font-size: 14px;
    color: #FFFFFF
  }

  .m-app-bonus {
    font-size: 20px;
    font-weight: 900;
    color: #F9BC01;
  }

  .m-app-illustrate2 {
    font-size: 10px;
    font-weight: 700;
    color: #FFFFFF;

    span {
      color: #F9BC01;
    }
  }

  .m-app-btn {
    font-size: 12px;
    font-weight: 700;
    color: #000000;
    background-color: #F9BC01;
    display: block;
    margin: 12px auto 0;
  }

}
</style>