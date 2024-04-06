<script lang="ts" setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { vipStore } from "@/store/vip";
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
const { t } = useI18n();
// member information  会员信息
const vipInfo = computed(() => {
    const { getVipInfo } = storeToRefs(vipStore());
    return getVipInfo.value
})

const closeGroupDialog = () => {
  emit("update:modelValue", false);
};
// 加入telegram 
const joinTelegram = () => {
  // window.location.href = `https://t.me/${vipInfo.value.telegram}`
  window.location.href = `https://t.me/HOY777Oficial`
};
//加入watsapp
const joinWatsapp = () => {
  window.location.href = `https://whatsapp.com/channel/0029VaVcgRGAu3aVUq386c1H`
};
</script>

<template>
  <v-dialog v-model="modelValueNew" @click:outside="closeGroupDialog" style="z-index: 20000">
    <div class="group_dialog-container">
      <v-btn
        class="m-close-button"
        icon="true"
        @click="closeGroupDialog"
        width="30"
        height="30"
      >
        <img src="@/assets/public/svg/icon_public_10.svg" />
      </v-btn>
      <div class="join-text">
        <font class="text-400-14 white">
          {{ t("vip.vip_level_info.progress.text_17") }}
        </font>
      </div>
      <div class="footer-btn">
        <div class="telegram-btn">
          <img
            src="@/assets/vip/svg/telegram_btn.svg"
            @click="joinTelegram"
          />
        </div>
        <div class="watsapp_btn-btn">
          <img
            src="@/assets/vip/svg/watsapp_btn.svg"
            @click="joinWatsapp"
          />
        </div>

      </div>
    </div>
  </v-dialog>
</template>

<style lang="scss">
.group_dialog-container {
  width: calc(100%);
  // height: 650px;
  height: 90vh;
  margin: auto;
  position: relative;
  background: url("@/assets/vip/image/group_select.png") no-repeat;
  background-size: 100% auto;
  padding: 24px;
  box-sizing: border-box;
  .m-close-button {
    box-shadow: none !important;
    background-color: transparent !important;
    position: absolute !important;
    top: 8px;
    right: 8px;
    .v-icon {
      font-size: 24px;
    }
  }
  .join-text {
    line-height:17px;
    width: 240px;
    text-align: center;
    position: absolute;
    left: 50%;
    bottom: 143px;
    transform: translate(-50%,0);
  }
  .footer-btn {
    width: calc(100% - 48px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 48px;
  }
  .telegram-btn,
  .watsapp_btn-btn {
    flex-basis: 50%;
    flex-shrink: 0;
    max-width: 50%;
    // max-width: 158px;
    // height: 68px;
    img {
      // object-fit: contain
      width: 100%;
    }
  }
}
</style>
