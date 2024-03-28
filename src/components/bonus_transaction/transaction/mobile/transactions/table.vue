<script lang="ts" setup>
import { ref, computed, watch, toRefs, onMounted } from "vue";
import moment from "moment-timezone";
import * as clipboard from "clipboard-polyfill";
import { useToast } from "vue-toastification";
import SuccessIcon from "@/components/global/notification/SuccessIcon.vue";

const tempHistoryList = ref(Array(8).fill({
  amount: '' as unknown as number,
  balance: 0,
  created_at: 0,
  id: "",
  note: "",
  type: 0,
  status: ''
}));
const notificationText = ref<string>("Successful replication");

const handleCopyID = async (id: string) => {
  clipboard.writeText(id).then(
    () => {
      console.log("Copied to clipboard!");
      const toast = useToast();
      toast.success(notificationText.value, {
        timeout: 3000,
        closeOnClick: false,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: false,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: SuccessIcon,
        rtl: false,
      });
    },
    (error) => {
      console.error("Could not copy text: ", error);
    }
  );
};
</script>
<template>
  <tr v-for="(item, index) in tempHistoryList" :key="index">
    <td
      class="text-400-12"
      style="padding-top: 21px !important; padding-bottom: 21px !important"
    >
      {{
        item.created_at
          ? moment(item.created_at * 1000).format("YYYY-MM-DD HH:mm:ss")
          : ""
      }}
    </td>
    <td
      class="text-400-12"
      style="
        min-width: 160px;
        padding-top: 21px !important;
        padding-bottom: 21px !important;
      "
      :class="
        Number(item.type) != -102 && item.type != -202
          ? 'color-01983A'
          : 'color-D42763'
      "
    >
      {{ item.amount }}
      <!-- {{ TransactionHistoryList[index].amount }} -->
    </td>
    <td
      class="text-400-12"
      style="padding-top: 21px !important; padding-bottom: 21px !important"
    >
      <template v-if="Number(item.type) == 101">
        {{ t("transaction_history.type.text_1") }}
      </template>
      <template v-if="Number(item.type) == -102">
        {{ t("transaction_history.type.text_2") }}
      </template>
      <template v-if="Number(item.type) == 103">
        {{ t("transaction_history.type.text_3") }}
      </template>
      <template v-if="Number(item.type) == 104">
        {{ t("transaction_history.type.text_4") }}
      </template>
      <template v-if="Number(item.type) == 201">
        {{ t("transaction_history.type.text_5") }}
      </template>
      <template v-if="Number(item.type) == -202">
        {{ t("transaction_history.type.text_6") }}
      </template>
      <template v-if="Number(item.type) == -203">
        {{ t("transaction_history.type.text_7") }}
      </template>
      <template v-if="Number(item.type) == 204">
        {{ t("transaction_history.type.text_8") }}
      </template>
      <template v-if="Number(item.type) == 301">
        {{ t("transaction_history.type.text_9") }}
      </template>
      <template v-if="Number(item.type) == 401">
        {{ t("transaction_history.type.text_10") }}
      </template>
      <template v-if="Number(item.type) == 901">
        {{ t("transaction_history.type.text_11") }}
      </template>
      <template v-if="Number(item.type) == -902">
        {{ t("transaction_history.type.text_12") }}
      </template>
      <template v-if="Number(item.type) == 801">
        {{ t("transaction_history.type.text_13") }}
      </template>
      <template v-if="Number(item.type) == -802">
        {{ t("transaction_history.type.text_14") }}
      </template>
    </td>
    <td
      class="text-400-12"
      style="
        min-width: 60px;
        padding-top: 21px !important;
        padding-bottom: 21px !important;
      "
    >
      <div class="d-flex justify-center">
        {{
          item.id.toString().length > 11
            ? item.id.toString().slice(0, 11) + "..."
            : item.id
        }}
        <img
          v-show="item.id"
          src="@/assets/public/svg/icon_public_71.svg"
          width="16"
          class="ml-1"
          @click="handleCopyID(item.id)"
        />
      </div>
    </td>
    <td
      class="text-400-12"
      style="padding-top: 21px !important; padding-bottom: 21px !important"
    >
      {{ item.note }}
    </td>
    <td
      class="text-400-12"
      style="
        min-width: 130px;
        padding-top: 21px !important;
        padding-bottom: 21px !important;
      "
    >
      {{ item.balance ? `${platformCurrency} ${item.balance}` : "" }}
    </td>
  </tr>
</template>