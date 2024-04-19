<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useDisplay } from "vuetify";
import { useRouter, useRoute } from "vue-router";
import { gameStore } from "@/store/game";
import { storeToRefs } from "pinia";
import img_gp_01 from "@/assets/home/image/img_gp_01.png";

const { t } = useI18n();
const { width } = useDisplay();
const router = useRouter();
const route = useRoute();
const { dispatchGameCategories } = gameStore();

const mobileWidth = computed(() => {
  return width.value;
});

const gameProviders = computed(() => {
  const { getGameProviders } = storeToRefs(gameStore());
  return getGameProviders.value;
});

// const handleGameProviderPage = (slug: string) => {
//   router.push({ name: "Provider", query: { slug: slug } });
// };

const handleThirdParthVendor = () => {
  router.push({ name: "Third_Parth_Vendor" });
}

watch(route, async (to, from) => {
  await dispatchGameCategories("?type=providers");
});

onMounted(async () => {
  await dispatchGameCategories("?type=providers");
});
</script>

<template>
  <!-------------------- game providers -------------->
  <v-row
    class="mb-4 white"
    :class="[mobileWidth < 600 ? 'mx-2 mt-8 text-800-16' : 'mx-4 mt-6 text-700-22']"
    @click="handleThirdParthVendor"
  >
    {{ t("home.game_providers") }}
  </v-row>
  <v-row class="ml-4 mr-2 mt-2" v-if="mobileWidth > 600">
    <div
      style="flex: 0 0 14.2857%; max-width: 14.2857%; padding-right: 8px"
      v-ripple.center
      v-for="(item, index) in gameProviders"
      :key="index"
    >
      <img :src="item.pictures" class="game-provider-img-width" />
    </div>
  </v-row>
  <v-row class="ma-2" v-else>
    <div class="m-game-provider-img-container">
      <div
        v-for="(gameProviderItem, gameProviderIndex) in gameProviders"
        :key="gameProviderIndex"
      >
        <img
          :src="gameProviderItem.pictures"
          width="126"
          height="49"
          class="mr-5"
          @click="handleThirdParthVendor"
        />
      </div>
    </div>
    <!-- <v-slide-group>
      <v-slide-group-item
        v-for="(gameProviderItem, gameProviderIndex) in gameProviders"
        :key="gameProviderIndex"
      >
        <img
          :src="gameProviderItem.pictures"
          width="126"
          height="49"
          class="mr-5"
          @click="handleThirdParthVendor"
        />
      </v-slide-group-item>
    </v-slide-group> -->
  </v-row>
</template>

<style lang="scss">
.game-provider-img-width {
  max-width: 160px !important;
  width: 100%;
  cursor: pointer;
}
@media (max-width: 600px) {
  .v-slide-group__prev {
    display: none !important;
  }
  .v-slide-group__next {
    display: none !important;
  }

  .m-game-provider-img-container {
    width: 100%;
    overflow-x: auto;
    display: flex;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none; /* WebKit */
    }
    ::-moz-scrollbar {
      display: none; /* Firefox */
    }
  }
}
</style>
