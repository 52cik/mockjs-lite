import { integer } from './basic';

/**
 * 把字符串的第一个字母转换为大写
 *
 * @export
 * @param {string} word
 * @returns
 */
export function capitalize(word) {
  word = String(word);
  return word.charAt(0).toUpperCase() + word.substr(1);
}

/**
 * 把字符串转换为大写
 *
 * @export
 * @param {string} str
 * @returns
 */
export function upper(str) {
  return String(str).toUpperCase();
}

/**
 * 把字符串转换为小写
 *
 * @export
 * @param {string} str
 * @returns
 */
export function lower(str) {
  return String(str).toLowerCase();
}

/**
 * 打乱数组中元素的顺序
 * @param {array} arr
 * @see https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 */
export function shuffle(arr, min, max) {
  arr = arr.slice(0);
  for (let i = arr.length; i; i--) {
    const j = Math.floor(Math.random() * i);
    [arr[i - 1], arr[j]] = [arr[j], arr[i - 1]];
  }

  switch (arguments.length) {
    case 2:
      max = min;
    /* falls through */
    case 3:
      min = parseInt(min, 10);
      max = parseInt(max, 10);
      return arr.slice(0, integer(min, max));
    default:
      return arr;
  }
}

/**
 * 从数组中随机选取一个元素，并返回
 *
 * @export
 * @param {array} arr
 * @param {number} min
 * @param {number} max
 */
export function pick(arr, min, max) {
  if (!(arr instanceof Array)) {
    /* eslint prefer-rest-params:0 */
    arr = [].slice.call(arguments);
    min = 1;
    max = 1;
  } else {
    // pick( [ item1, item2 ... ] )
    if (min === undefined) min = 1;
    // pick( [ item1, item2 ... ], count )
    if (max === undefined) max = min;
  }

  if (min === 1 && max === 1) {
    return arr[integer(0, arr.length - 1)];
  }

  return shuffle(arr, min, max);
}
