import { pick } from './helper';
import { character, string } from './basic';
import { date } from './date';
import DICT from './address_dict';

/**
 * 随机生成一个 GUID (uuid v4)
 *
 * @export
 * @returns
 *
 * @see https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#answer-2117523
 */
export function uuid() {
  /* eslint no-bitwise:0 */
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 随机生成一个 GUID
 *
 * @export
 * @returns
 */
export const guid = uuid;

/**
 * 随机生成一个 18 位身份证
 *
 * @export
 */
export function id() {
  const rank = '7910584216379105842';
  const last = '10X98765432';

  let sum = 0;
  let idcard = pick(DICT).id + date('yyyyMMdd') + string('number', 3);

  for (let i = 0; i < idcard.length; i++) {
    sum += idcard[i] * rank[i];
  }

  idcard += last[sum % 11]; // 效验码

  return idcard;
}

/* 自增变量 */
let incrementKey = 0;

/**
 * 生成一个全局的自增整数
 * 类似自增主键（auto increment primary key）
 *
 * @export
 * @returns
 */
export function increment(step) {
  incrementKey += +(step || 1); // step?
  return incrementKey;
}

/**
 * 生成一个全局的自增整数
 * 类似自增主键（auto increment primary key）
 *
 * @export
 * @returns
 */
export const inc = increment;

/**
 * 随机生成一个国内手机号码
 *
 * @export
 * @returns
 */
export function mobile() {
  return `1${character('34578')}${string('number', 9)}`;
}
