import { ref, defineEmits } from 'vue'
import Loading from "@/components/global/loading.vue";

export default function usePageLoading() {
    const pageLoading = ref<boolean>(false);
    const setPageLoading = (val: boolean) => {
        pageLoading.value = val;
    }

    return {
        pageLoading,
        setPageLoading,
        Loading,
    }
}