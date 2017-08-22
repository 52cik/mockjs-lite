import DICT from './color_dict';

// 暴露出去，方便插件使用
export const COLOR_DICT = DICT;

const goldenRatio = 0.618033988749895;
let hue = Math.random();

/**
 * 随机生成一个有吸引力的颜色
 *
 * @param {any} saturation
 * @param {any} value
 * @returns
 *
 * @see http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
 * @see https://github.com/devongovett/color-generator/blob/master/index.js
 */
function goldenRatioColor(saturation, value) {
  hue += goldenRatio;
  hue %= 1;

  if (typeof saturation !== 'number') {
    saturation = 0.5;
  }

  if (typeof value !== 'number') {
    value = 0.95;
  }

  return [hue * 360, saturation * 100, value * 100];
}


/* eslint-disable */
function hsv2hsl(hsv) {
  var h = hsv[0],
    s = hsv[1] / 100,
    v = hsv[2] / 100,
    sl, l;

  l = (2 - s) * v;
  sl = s * v;
  sl /= (l <= 1) ? l : 2 - l;
  l /= 2;
  return [h, sl * 100, l * 100];
}

function hsv2rgb(hsv) {
  var h = hsv[0] / 60
  var s = hsv[1] / 100
  var v = hsv[2] / 100
  var hi = Math.floor(h) % 6

  var f = h - Math.floor(h)
  var p = 255 * v * (1 - s)
  var q = 255 * v * (1 - (s * f))
  var t = 255 * v * (1 - (s * (1 - f)))

  v = 255 * v

  switch (hi) {
    case 0:
      return [v, t, p]
    case 1:
      return [q, v, p]
    case 2:
      return [p, v, t]
    case 3:
      return [p, q, v]
    case 4:
      return [t, p, v]
    case 5:
      return [v, p, q]
  }
}

/**
 * rgb 转 hex
 *
 * @param {any} r
 * @param {any} g
 * @param {any} b
 * @returns
 *
 */
function rgb2hex(r, g, b) {
  return ((256 + r << 8 | g) << 8 | b).toString(16).slice(1);
}
/* eslint-enable */

/**
 * 随机生成一个颜色，格式为 '#RRGGBB' 或 'RRGGBB'
 *
 * @export
 * @param {bool} symbol
 * @returns
 */
export function hex(symbol) {
  const hsv = goldenRatioColor();
  const rgbVal = hsv2rgb(hsv);
  const ret = rgb2hex(rgbVal[0], rgbVal[1], rgbVal[2]);
  return symbol ? `#${ret}` : ret;
}

/**
 * rgb颜色 rgb(128,255,255)
 *
 * @export
 * @returns
 */
export function rgb() {
  const hsv = goldenRatioColor();
  const ret = hsv2rgb(hsv);
  return `rgb(${parseInt(ret[0], 10)}, ${parseInt(ret[1], 10)}, ${parseInt(ret[2], 10)})`;
}

/**
 * rgba颜色 rgba(128,255,255,0.3)
 *
 * @export
 * @returns
 */
export function rgba() {
  const hsv = goldenRatioColor();
  const ret = hsv2rgb(hsv);
  return `rgba(${parseInt(ret[0], 10)}, ${parseInt(ret[1], 10)}, ${parseInt(ret[2], 10)}, ${Math.random().toFixed(2)})`;
}

/**
 * hsl颜色 hsl(300,80%,90%)
 *
 * @export
 * @returns
 */
export function hsl() {
  const hsv = goldenRatioColor();
  const ret = hsv2hsl(hsv);
  return `hsl(${parseInt(ret[0], 10)}, ${parseInt(ret[1], 10)}, ${parseInt(ret[2], 10)})`;
}

/**
 * 随机生成一个有吸引力的颜色，格式为 '#RRGGBB'
 *
 * @export
 * @param {any} name
 * @returns
 */
export function color(name) {
  if (name || DICT[name]) {
    return DICT[name];
  }
  return hex(true);
}
