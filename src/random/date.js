import { integer } from './basic';

/**
 * 格式日期，网上抄的，eslit fix 了下而已。
 *
 * @param {string} fmt 格式化字符串
 * @param {Date} dt 日期对象
 * @returns
 */
function dateFormat(fmt, dt) {
  const o = {
    'M+': dt.getMonth() + 1, // 月份
    'd+': dt.getDate(), // 日
    'h+': dt.getHours(), // 小时
    'm+': dt.getMinutes(), // 分
    's+': dt.getSeconds(), // 秒
    'q+': Math.floor((dt.getMonth() + 3) / 3), // 季度
    S: dt.getMilliseconds(), // 毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, `${dt.getFullYear()}`.substr(4 - RegExp.$1.length));
  }

  /* eslint no-restricted-syntax:0 */
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const rep = RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length);
      fmt = fmt.replace(RegExp.$1, rep);
    }
  }

  return fmt;
}

/**
 * 随机生成 [1970-01-01, 10年后] 区间的日期对象
 *
 * @returns
 */
function randomDate(min, max) {
  min = min ? new Date(min) : new Date(0); // 1970-01-01

  if (max) {
    max = new Date(max);
  } else {
    max = new Date();
    max.setFullYear(max.getFullYear() + 10); // 10年后
  }

  return new Date(integer(max.getTime(), min.getTime()));
}

/**
 * 获取时间戳
 *
 * @param {date} dt
 * @param {bool|number} num true|10 返回13/10位时间戳
 * @returns
 */
function getTimeStamp(dt, num) {
  const n = Date.now();
  /* eslint no-bitwise: 0 */
  return num === 10 ? (n / 1000) | 0 : n;
}

/**
 * 日期部分格式化
 *
 * @export
 * @param {string|number|bool} format
 * @param {string} min
 * @param {string|number|bool} max
 * @returns
 */
export function date(format, min, max) {
  return datetime(format || 'yyyy-MM-dd', min, max);
}

/**
 * 时分秒部分格式化
 *
 * @export
 * @param {string|number|bool} format
 * @param {string} min
 * @param {string|number|bool} max
 * @returns
 */
export function time(format, min, max) {
  return datetime(format || 'hh:mm:ss', min, max);
}

/**
 * 完整时间部分格式化
 *
 * @export
 * @param {string|number|bool} format
 * @param {string} min
 * @param {string|number|bool} max
 * @returns
 */
export function datetime(format, min, max) {
  let dt;
  let timeStamp = false;

  // datetime()
  // datetime(fmt)
  // datetime(timeStamp)
  // datetime(min, max)
  // datetime(fmt, min, max)
  // datetime(min, max, timeStamp)

  switch (arguments.length) {
    case 0: // datetime()
    case 1:
      // datetime(fmt)
      dt = randomDate();
      // datetime(timeStamp)
      if (format === true || format === 10) {
        timeStamp = format;
      }
      break;
    case 2:
      // datetime(min, max)
      dt = randomDate(format, min);
      break;
    case 3:
      // datetime(min, max, timeStamp)
      if (max === true || max === 10) {
        timeStamp = max;
        dt = randomDate(format, min);
      } else {
        // datetime(fmt, min, max)
        dt = randomDate(min, max);
      }
      break;
    default:
  }

  // 时间戳处理
  if (timeStamp) {
    return getTimeStamp(dt, timeStamp);
  }

  return dateFormat(format || 'yyyy-MM-dd hh:mm:ss', dt);
}

/**
 * 当前时间格式化
 *
 * @export
 * @param {string|number|bool} format
 * @returns
 */
export function now(format) {
  if (format === true || format === 10) {
    return getTimeStamp(Date.now(), format);
  }
  return dateFormat(format || 'yyyy-MM-dd hh:mm:ss', new Date());
}
