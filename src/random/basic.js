/**
 * 字符集模板
 */
const poolsChar = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  number: '0123456789',
  symbol: '!@#$%^&*()[]',
};
poolsChar.alpha = poolsChar.lower + poolsChar.upper;
poolsChar.undefined = poolsChar.lower + poolsChar.upper + poolsChar.number + poolsChar.symbol;

/**
 * 根据 min-max 返回随机值
 *
 * @export
 * @param {any} min
 * @param {any} max
 * @returns
 */
export function integer(min, max) {
  min = min !== undefined ? parseInt(min, 10) : -9007199254740992;
  max = max !== undefined ? parseInt(max, 10) : 9007199254740992; // 2^53
  return Math.round(Math.random() * (max - min)) + min;
}
// 别名
export const int = integer;

/**
 * 根据 1/min-max 的概率返回 cur 的值
 *
 * @export
 * @param {any} min
 * @param {any} max
 * @param {any} cur
 * @returns
 */
export function boolean(min, max, cur) {
  if (min === undefined) {
    return Math.random() >= 0.5;
  }
  const denom = max ? integer(min, max) : parseInt(min, 10);
  return Math.random() * denom < 1 ? Boolean(cur) : !cur;
}
// 别名
export const bool = boolean;

// 返回一个随机的浮点数。
export function float(min, max, dmin, dmax) {
  dmax = dmax || 17;
  dmax = Math.max(Math.min(dmax, 17), 0);
  dmin = dmin || 0;
  dmin = Math.max(Math.min(dmin, 17), 0);

  const dcount = integer(dmin, dmax);
  const ret = `${max ? integer(min, max) : min}.${string('number', dcount - 1)}${character('123456789')}`;
  return parseFloat(ret, 10);
}

/**
 * 返回一个随机字符
 *
 * @export
 * @param {any} pool
 * @returns
 */
export function character(pool) {
  pool = String(pool);
  pool = poolsChar[pool.toLowerCase()] || pool;
  return pool.charAt(integer(0, pool.length - 1));
}
export const char = character;

/**
 * 返回一个随机字符串
 *
 * @export
 * @param {any} pool
 * @param {any} min
 * @param {any} max
 * @returns
 */
export function string(pool, min, max) {
  let count = 0;

  if (max !== undefined) {
    count = integer(min, max);
  } else if (min !== undefined) {
    count = +min;
  } else if (typeof pool === 'number') {
    count = parseInt(pool, 10);
    pool = undefined;
  } else {
    count = integer(3, 7);
  }

  let text = '';
  for (let i = 0; i < count; i++) {
    text += character(pool);
  }

  return text;
}
export const str = string;

/**
 * 返回一个整型数组
 *
 * @export
 * @param {number} start 开始
 * @param {number} stop  结束
 * @param {number} step  步长
 * @returns
 */
export function range(start, stop, step) {
  if (!step) {
    step = 1;
  }

  if (!stop) {
    stop = start || 0;
    start = 0;
  }

  start = +start; // 开始
  stop = +stop; // 结束
  step = +step; // 步长

  const arr = [];

  for (let i = start; i < stop; i += step) {
    arr.push(i);
  }

  return arr;
}
