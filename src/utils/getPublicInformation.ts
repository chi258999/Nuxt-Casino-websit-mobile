import FP from '@fingerprintjs/fingerprintjs-pro';

// 获取当前url中的所有参数
export function getQueryParams(): Record<string, string> {
  const queryString = window.location.search.substring(1);
  const queryParams: Record<string, string> = {};
  const pairs = queryString.split('&');

  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    queryParams[key] = decodeURIComponent(value);
  });

  return queryParams;
}

// 获取当前运行的设备
export function getDeviceType(): string {
  const userAgent: string = navigator.userAgent;

  if (/Macintosh/.test(userAgent)) {
    return 'mac';
  } else if (/Windows NT/.test(userAgent)) {
    return 'pc';
  } else if (/iPhone|iPad|iPod/.test(userAgent)) {
    return 'ios';
  } else if (/Android/.test(userAgent)) {
    return 'android';
  } else {
    return 'Unknown';
  }
}

// 获取风控信息封装
export async function getFingerprintInfor() {
  const queryParams = getQueryParams()
  const os = getDeviceType()

  // 创建设备平台映射
  const platformMap: Map<string, string> = new Map([
    ['mac', 'ios_desktop'],
    ['pc', 'pc'],
    ['ios', 'ios_web'],
    ['android', 'android_web']
  ]);

  if (queryParams['mobile'] === 'android') {
    return {
      "Req-Id": queryParams['request_id'],
      "Fp": queryParams['visitor_id'],
      "Source": os === 'ios' ? 'ios_app' : 'android_app'
    }
  } else {
    // 获取fingerprint指纹
    try {
      const fp = await FP.load({
        token: 'F2FGYiUPWrRUc2mVnpnR'
      });
      const result = await fp.get();
      
      return {
        "Req-Id": result.requestId,
        "Fp": result.visitorId,
        "Source": platformMap.get(os)
      }
    } catch (error) {
      console.error('Failed to get browser fingerprint:', error);
    }
  }
}