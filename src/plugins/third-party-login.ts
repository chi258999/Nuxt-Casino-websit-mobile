// ElLoading 为elementplus的loading加载动画，不需要自行去除！！
import { ElLoading } from "element-plus";

// 登录类型枚举
enum LoginType {
  Google = "google",
  Facebook = "facebook",
}

// 全局 window 对象
const globalWindow: any = window;

// 封装登录函数
const loginWithSocialMedia = async (type: LoginType): Promise<any> => {
  // 显示 loading 动画
  const loading = ElLoading.service({ lock: true });
  try {
    // 根据不同的登录类型执行相应的登录逻辑
    switch (type) {
      case LoginType.Google:
        return await loginWithGoogle();
      case LoginType.Facebook:
        return await loginWithFacebook();
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

// Google 登录逻辑封装
const loginWithGoogle = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      globalWindow.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        scope: "email",
        callback: resolve,
      });
      globalWindow.google.accounts.id.prompt();
    } catch (error) {
      reject(error);
    }
  });
};

// Facebook 登录逻辑封装
const loginWithFacebook = (): Promise<any> => {
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
            resolve(res.authResponse);
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

export { loginWithSocialMedia, LoginType };
