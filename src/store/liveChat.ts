import { defineStore } from "pinia";

interface currentState {
  visibility: string;
}
interface LiveChatWidgetRef {
  // 定义 LiveChatWidget 对象的属性和方法
  // 根据 LiveChatWidget 的实际接口定义添加相应的属性和方法
  init?: Function;
  on?: Function;
  call?: Function;
}

// 声明 window 上的 LiveChatWidget 属性
declare global {
  interface Window {
    LiveChatWidget: LiveChatWidgetRef;
  }
}

const LiveChatWidgetRef: LiveChatWidgetRef = window.LiveChatWidget;

export const liveChatStore = defineStore({
  id: "liveChat",
  state: () => ({
    customerData: {},
    currentState: <currentState>{
      visibility: "hidden",
    },
    LiveChatWidget: LiveChatWidgetRef,
  }),
  getters: {
    getVisibility: (state) => state.currentState.visibility,
  },
  actions: {
    // 获取初始数据
    setInitialData(initialData: any) {
      this.customerData = initialData.customerData;
      this.currentState = initialData.state;
    },
    setLiveChatVisibility(value: string) {
      this.currentState.visibility = value;
    },
    setLiveChatMaximize() {
      console.log(this.currentState.visibility, 'getVisibility1');
      this.LiveChatWidget?.call?.("maximize");
    //   this.currentState.visibility = "maximize";
      console.log(this.currentState.visibility, 'getVisibility2');
    },
    setLiveChatHidden() {
      this.LiveChatWidget?.call?.("hide");
      this.currentState.visibility = "hidden";
    },
  },
});
