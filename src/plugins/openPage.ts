
import AdjustClass from '@/utils/adjust';

export const useOpenUrl = () => {
    let appInstance = AdjustClass.getInstance()

    const openUrl = (url: string, blank: boolean = false) => {
        if (!url) return;
        if (!appInstance) {
            // 浏览器端打开页面
            if( blank ) {
                window.open(url, '_blank');
            } else {
                window.location.href = url
            }
        } else {
            // app端打开页面
            androidOpenUrl(url)
        }
    }
    const androidOpenUrl = (url) => {
        if (url) {
            window["AndroidWebView"].openUrl(url)
        }
    }

    return {
        appInstance,
        openUrl,
        androidOpenUrl,
    }
}