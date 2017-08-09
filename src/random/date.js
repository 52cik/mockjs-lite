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
function randomDate() {
  const min = new Date(0); // 1970-01-01
  const max = new Date();
  max.setFullYear(max.getFullYear() + 10); // 10年后
  return new Date(Math.random() * (max.getTime() - min.getTime()));
}

/**
 * 日期部分格式化
 *
 * @export
 * @param {string} format
 * @returns
 */
export function date(format) {
  return dateFormat(format || 'yyyy-MM-dd', randomDate());
}

/**
 * 时分秒部分格式化
 *
 * @export
 * @param {string} format
 * @returns
 */
export function time(format) {
  return dateFormat(format || 'hh:mm:ss', randomDate());
}

/**
 * 完整时间部分格式化
 *
 * @export
 * @param {string} format
 * @returns
 */
export function datetime(format) {
  return dateFormat(format || 'yyyy-MM-dd hh:mm:ss', randomDate());
}

/**
 * 当前时间格式化
 *
 * @export
 * @param {string} format
 * @returns
 */
export function now(format) {
  return dateFormat(format || 'yyyy-MM-dd hh:mm:ss', new Date());
}
