import { computed } from "vue";
import { ElLoading } from "element-plus";
import { googleTokenLogin } from "vue3-google-login";
import { authStore } from "@/store/auth";
import { storeToRefs } from "pinia";
import AdjustClass from "@/utils/adjust";

let indexValue = 0;
let typeValue = "";

// 接受android傳遞的token
(window as any).googleLogin = (token: string) => {
    loginOrRegister(token, indexValue, typeValue);
}

// 全局 window 对象
const globalWindow: any = window;

const { dispatchQuickLogin, dispatchQuickRegister } = authStore();

// 获取用户信息
const userInfo = computed(() => {
    const { getUserInfo } = storeToRefs(authStore());
    return getUserInfo.value;
});

/**
 * 封装登录函数
 * @param index 0:facebook  1:google
 * @returns 
 */
const loginWithSocialMedia = async (index: number, type: string): Promise<any> => {
  // 显示 loading 动画
  const loading = ElLoading.service({ lock: true });
  try {
    // 根据不同的登录类型执行相应的登录逻辑
    switch (index) {
      case 0:
        return await loginWithFacebook(index, type);
      case 1:
        return await loginWithGoogle(index, type);
      default:
        throw new Error("Unsupported login type");
    }
  } catch (error) {
    // 捕获错误并向外部抛出
    throw error;
  } finally {
    // 无论如何都关闭 loading 动画
    loading.close();
  }
};

/**
 * 判断登录和注册
 * @param type 
 */
const loginOrRegister = async (token: string, index: number, type: string) => {
    let val = 1;
    if (index === 0) {
        val = 2;
    }
    if (index === 1) {
        val = 1;
    }
    let params = { 
        id_token: token,
        type: val,
    }
    if (type === "login") {
        await dispatchQuickLogin(params);
    } else {
        await dispatchQuickRegister(params);
    }
}

const startAndroid = (index: number, type: string) => {

}

// Google 登录逻辑封装
const loginWithGoogle = (index: number, type: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
        if (AdjustClass.getInstance().isMobileWebview) {
            // 啟動android原生登錄流程 
            (window as any)["AndroidWebView"].googleLogin();
            indexValue = index;
            typeValue = type;
        } else {
            googleTokenLogin({
                clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            }).then(async (res: any) => {
                await loginOrRegister(res.access_token, index, type);
                resolve(res);
            });
        }
    } catch (error) {
      reject(error);
    }
  });
};

// Facebook 登录逻辑封装
const loginWithFacebook = (index: number, type: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      globalWindow.FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });
      globalWindow.FB.getLoginStatus((response: any) => {
        if (response.status !== "connected") {
          globalWindow.FB.login((res: any) => {
            (window as any).FB.api("/me?fields=email,name", async (response: any) => {
                await loginOrRegister(res.access_token, index, type);
                resolve(res);
              });
          });
        } else {
          resolve(response.authResponse);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * 登录方式
 * @param index 0:facebook  1:google
 */
const loginType = (index: number) => {
    let type = "";
    if (index === 0) {
        type = "FACEBOOK_LOGIN";
    }
    if (index === 1) {
        type = "GOOGLE_LOGIN";
    }
    AdjustClass.getInstance().adjustTrackEvent({
        key: type,
        value: String(userInfo.value.id),
        params: "",
    });
}

export { loginWithSocialMedia, loginType };
