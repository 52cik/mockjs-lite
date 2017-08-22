import { pick } from './helper';
import { string } from './basic';
import DICT from './address_dict';

const REGION = ['东北', '华北', '华东', '华中', '华南', '西南', '西北'];

// 暴露出去，方便插件使用
export const ADDRESS_DICT = DICT;

/**
 * 随机生成一个大区
 *
 * @export
 * @returns
 */
export function region() {
  return pick(REGION);
}

/**
 * 随机生成一个（中国）省（或直辖市、自治区、特别行政区）
 *
 * @export
 * @returns
 */
export function province() {
  return pick(DICT).name;
}

/**
 * 随机生成一个（中国）市
 *
 * @export
 * @param {bool} prefix
 * @returns
 */
export function city(prefix) {
  const provinceItem = pick(DICT);
  const cityItem = pick(provinceItem.children);
  return prefix ? [provinceItem.name, cityItem.name].join(' ') : cityItem.name;
}

/**
 * 随机生成一个（中国）县
 *
 * @export
 * @param {bool} prefix
 * @returns
 */
export function county(prefix) {
  const provinceItem = pick(DICT);
  const cityItem = pick(provinceItem.children);
  const countyItem = pick(cityItem.children) || { name: '-' };
  return prefix ? [provinceItem.name, cityItem.name, countyItem.name].join(' ') : countyItem.name;
}

/**
 * 随机生成一个邮政编码（六位数字）
 *
 * @export
 * @param {number} len
 * @returns
 */
export function zip(len) {
  return string('number', len || 6);
}
