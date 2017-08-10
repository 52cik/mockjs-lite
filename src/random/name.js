import { pick } from './helper';

// male
const nameMale =
  'James John Robert Michael William David Richard Charles Joseph Thomas Christopher Daniel Paul Mark Donald George Kenneth Steven Edward Brian Ronald Anthony Kevin Jason Matthew Gary Timothy Jose Larry Jeffrey Frank Scott Eric';

// female
const nameFemale =
  'Mary Patricia Linda Barbara Elizabeth Jennifer Maria Susan Margaret Dorothy Lisa Nancy Karen Betty Helen Sandra Donna Carol Ruth Sharon Michelle Laura Sarah Kimberly Deborah Jessica Shirley Cynthia Angela Melissa Brenda Amy Anna';

// first names
const firstNames = `${nameMale} ${nameFemale}`.split(' ');

// last names
const lastNames = 'Smith Johnson Williams Brown Jones Miller Davis Garcia Rodriguez Wilson Martinez Anderson Taylor Thomas Hernandez Moore Martin Jackson Thompson White Lopez Lee Gonzalez Harris Clark Lewis Robinson Walker Perez Hall Young Allen'.split(
  ' ',
);

// 姓氏
const cfirstNames = '王李张刘陈杨赵黄周吴徐孙胡朱高林何郭马罗梁宋郑谢韩唐冯于董萧程曹袁邓许傅沈曾彭吕苏卢蒋蔡贾丁魏薛叶阎余潘杜戴夏锺汪田任姜范方石姚谭廖邹熊金陆郝孔白崔康毛邱秦江史顾侯邵孟龙万段雷钱汤尹黎易常武乔贺赖龚文'.split(
  '',
);

// 名
const clastNames = '伟 芳 娜 秀英 敏 静 丽 强 磊 军 洋 勇 艳 杰 娟 涛 明 超 秀兰 霞 平 刚 桂英'.split(' ');

/**
 * 随机生成英文名
 *
 * @export
 * @returns
 */
export function first() {
  return pick(firstNames);
}

/**
 * 随机生成英文姓氏
 *
 * @export
 * @returns
 */
export function last() {
  return pick(lastNames);
}

/**
 * 随机生成英文姓名
 *
 * @export
 * @param {bool} middle 是否有中间名字
 * @returns
 */
export function name(middle) {
  return `${first()} ${middle ? `${first()} ` : ''}${last()}`;
}

/**
 * 随机生成中文姓
 *
 * @export
 * @returns
 */
export function cfirst() {
  return pick(cfirstNames);
}

/**
 * 随机生成中文名
 *
 * @export
 * @returns
 */
export function clast() {
  return pick(clastNames);
}

/**
 * 随机生成中文姓名
 *
 * @export
 * @returns
 */
export function cname() {
  return cfirst() + clast();
}
