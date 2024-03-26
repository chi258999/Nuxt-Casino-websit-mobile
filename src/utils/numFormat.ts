/**
 * 增加千分位分割符 10000 => "10,000"
 * @param {string | number} num
 * @return {string}
 */
export function toThousandFilter(num: string | number): string {
  const numStr: string = typeof num === 'string' ? num : (+num || 0).toString();
  return numStr.replace(/\d+/, function (match) {
    return match.replace(/(\d)(?=(\d{3})+$)/g, m => m + ',');
  });
}

/**
 * 保留 n 位小数，不做四舍五入处理 10000.1234 => "10000.12"
 * @param {string | number} num
 * @param {number} place
 * @return {string}
 */
export function keepNDecimalPlaces(num: string | number, place: number = 2): string {
  const numStr: string = typeof num === 'string' ? num : (+num || 0).toString();
  if (place! < 1) { // 使用非空断言排除 null 的可能性
    return numStr;
  } else if (place.toString().indexOf('.') !== -1) {
    place = parseInt(place.toString().split('.')[0]);
  }
  const result = new RegExp(`^\\-?\\d+(?:\\.\\d{1,${place}})?`).exec(numStr);
  return result ? result[0] : numStr; // 检查是否有匹配结果，避免访问 null
}

/**
 * 清除千分位分割符 "10,000" => "10000"
 * @param {string} str
 * @return {string}
 */
export function clearThousandFilter(str: string): string {
  return str.replace(/\,/g, '');
}

/**
 * 保留两位小数
 * @param {string | number} num
 * @return {string}
 */
export function toFormatNum(num: string | number): string {
  if (!num || isNaN(Number(num))) return num.toString(); // Falsy || "-"
  return keepNDecimalPlaces(num);
}

/**
 * 保留三位小数
 * @param {string | number} num
 * @return {string}
 */
export function keepThreenNum(num: string | number): string {
  if (!num || isNaN(Number(num))) return num.toString(); // Falsy || "-"
  return keepNDecimalPlaces(num, 3);
}