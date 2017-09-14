/*!
 * Mockjs-lite v0.3.2
 * (c) 2017-2017 楼教主 <fe.52cik@gmail.com> (https://github.com/52cik/mockjs-lite)
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Mock = {})));
}(this, (function (exports) { 'use strict';

/**
 * 字符集模板
 */
var poolsChar = {
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  number: '0123456789',
  symbol: '!@#$%^&*()[]'
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
function integer(min, max) {
  min = min !== undefined ? parseInt(min, 10) : -9007199254740992;
  max = max !== undefined ? parseInt(max, 10) : 9007199254740992; // 2^53
  return Math.round(Math.random() * (max - min)) + min;
}
// 别名
var int = integer;

/**
 * 根据 1/min-max 的概率返回 cur 的值
 *
 * @export
 * @param {any} min
 * @param {any} max
 * @param {any} cur
 * @returns
 */
function boolean(min, max, cur) {
  if (min === undefined) {
    return Math.random() >= 0.5;
  }
  var denom = max ? integer(min, max) : parseInt(min, 10);
  return Math.random() * denom < 1 ? Boolean(cur) : !cur;
}
// 别名
var bool = boolean;

// 返回一个随机的浮点数。
function float(min, max, dmin, dmax) {
  dmax = dmax || 17;
  dmax = Math.max(Math.min(dmax, 17), 0);
  dmin = dmin || 0;
  dmin = Math.max(Math.min(dmin, 17), 0);

  var dcount = integer(dmin, dmax);
  var intPart = max ? integer(min, max - 1) : min || integer();
  var ret = intPart + '.' + string('number', dcount - 1) + character('123456789');
  return parseFloat(ret, 10);
}

/**
 * 返回一个随机字符
 *
 * @export
 * @param {any} pool
 * @returns
 */
function character(pool) {
  pool = String(pool);
  pool = poolsChar[pool.toLowerCase()] || pool;
  return pool.charAt(integer(0, pool.length - 1));
}
var char = character;

/**
 * 返回一个随机字符串
 *
 * @export
 * @param {any} pool
 * @param {any} min
 * @param {any} max
 * @returns
 */
function string(pool, min, max) {
  var count = 0;

  // string()
  // string( length )
  // string( pool, length )
  // string( min, max )
  // string( pool, min, max )

  var isNumPool = typeof pool === 'number';

  if (max !== undefined) {
    count = integer(min, max);
  } else if (min !== undefined) {
    if (isNumPool) {
      count = integer(pool, min);
      pool = undefined;
    } else {
      count = +min;
    }
  } else if (isNumPool) {
    count = parseInt(pool, 10);
    pool = undefined;
  } else {
    count = integer(3, 7);
  }

  var text = '';
  for (var i = 0; i < count; i++) {
    text += character(pool);
  }

  return text;
}
var str = string;

/**
 * 返回一个整型数组
 *
 * @export
 * @param {number} start 开始
 * @param {number} stop  结束
 * @param {number} step  步长
 * @returns
 */
function range(start, stop, step) {
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

  var arr = [];

  for (var i = start; i < stop; i += step) {
    arr.push(i);
  }

  return arr;
}

/**
 * 把字符串的第一个字母转换为大写
 *
 * @export
 * @param {string} word
 * @returns
 */
function capitalize(word) {
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
function upper(str$$1) {
  return String(str$$1).toUpperCase();
}

/**
 * 把字符串转换为小写
 *
 * @export
 * @param {string} str
 * @returns
 */
function lower(str$$1) {
  return String(str$$1).toLowerCase();
}

/**
 * 打乱数组中元素的顺序
 * @param {array} arr
 * @see https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
 */
function shuffle(arr, min, max) {
  arr = arr.slice(0);
  for (var i = arr.length; i; i--) {
    var j = Math.floor(Math.random() * i);
    var _ref = [arr[j], arr[i - 1]];
    arr[i - 1] = _ref[0];
    arr[j] = _ref[1];
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
function pick(arr, min, max) {
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

/**
 * 格式日期，网上抄的，eslit fix 了下而已。
 *
 * @param {string} fmt 格式化字符串
 * @param {Date} dt 日期对象
 * @returns
 */
function dateFormat(fmt, dt) {
  var o = {
    'M+': dt.getMonth() + 1, // 月份
    'd+': dt.getDate(), // 日
    'h+': dt.getHours(), // 小时
    'm+': dt.getMinutes(), // 分
    's+': dt.getSeconds(), // 秒
    'q+': Math.floor((dt.getMonth() + 3) / 3), // 季度
    S: dt.getMilliseconds() // 毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ('' + dt.getFullYear()).substr(4 - RegExp.$1.length));
  }

  /* eslint no-restricted-syntax:0 */
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      var rep = RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length);
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
  var n = Date.now();
  /* eslint no-bitwise: 0 */
  return num === 10 ? n / 1000 | 0 : n;
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
function date(format, min, max) {
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
function time(format, min, max) {
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
function datetime(format, min, max) {
  var dt = void 0;
  var timeStamp = false;

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
      format = undefined;
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
      break;
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
function now(format) {
  if (format === true || format === 10) {
    return getTimeStamp(Date.now(), format);
  }
  return dateFormat(format || 'yyyy-MM-dd hh:mm:ss', new Date());
}

// 七牛占位图 host，支持 https
var host = 'dn-placeholder.qbox.me';

// 常见的广告宽高
var adSize = ['300x250', '250x250', '240x400', '336x280', '180x150', '720x300', '468x60', '234x60', '88x31', '120x90', '120x60', '120x240', '125x125', '728x90', '160x600', '120x600', '300x600'];

// 常见的屏幕宽高 (暂时没用)
// const screenSize = [
//   '320x200',
//   '320x240',
//   '640x480',
//   '800x480',
//   '800x480',
//   '1024x600',
//   '1024x768',
//   '1280x800',
//   '1440x900',
//   '1920x1200',
//   '2560x1600',
// ];

// 常见的视频宽高 (暂时没用)
// const videoSize = ['720x480', '768x576', '1280x720', '1920x1080'];

/**
 * 设置 host 用于自定义占位图
 *
 * @export
 * @param {any} newHost
 */
function setImageHost(newHost) {
  host = newHost;
}

/**
 * 生成一个随机的占位图
 *
 * @export
 * @param {string} size
 * @param {string} background
 * @param {string} foreground
 * @param {string} format
 * @param {string} text
 * @returns
 */
function image(size, background, foreground, format, text) {
  // Random.image( size, background, foreground, text )
  if (arguments.length === 4) {
    text = format;
    format = undefined;
  }
  // Random.image( size, background, text )
  if (arguments.length === 3) {
    text = foreground;
    foreground = undefined;
  }
  // Random.image()
  if (!size) {
    size = pick(adSize);
  }

  return 'http://' + host + '/' + size + (background ? '/' + background : '') + (foreground ? '/' + foreground : '') + (format ? '.' + format : '') + (text ? '&text=' + text : '');
}

/**
 * Color 字典数据
 *
 * 字典数据来源 [A nicer color palette for the web](http://clrs.cc/)
 */
var DICT = {
  navy: '#001F3F',
  blue: '#0074D9',
  aqua: '#7FDBFF',
  teal: '#39CCCC',
  olive: '#3D9970',
  green: '#2ECC40',
  lime: '#01FF70',
  yellow: '#FFDC00',
  orange: '#FF851B',
  red: '#FF4136',
  maroon: '#85144B',
  fuchsia: '#F012BE',
  purple: '#B10DC9',
  silver: '#DDDDDD',
  gray: '#AAAAAA',
  black: '#111111',
  white: '#FFFFFF'
};

// 暴露出去，方便插件使用
var COLOR_DICT = DICT;

var goldenRatio = 0.618033988749895;
var hue = Math.random();

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
      sl,
      l;

  l = (2 - s) * v;
  sl = s * v;
  sl /= l <= 1 ? l : 2 - l;
  l /= 2;
  return [h, sl * 100, l * 100];
}

function hsv2rgb(hsv) {
  var h = hsv[0] / 60;
  var s = hsv[1] / 100;
  var v = hsv[2] / 100;
  var hi = Math.floor(h) % 6;

  var f = h - Math.floor(h);
  var p = 255 * v * (1 - s);
  var q = 255 * v * (1 - s * f);
  var t = 255 * v * (1 - s * (1 - f));

  v = 255 * v;

  switch (hi) {
    case 0:
      return [v, t, p];
    case 1:
      return [q, v, p];
    case 2:
      return [p, v, t];
    case 3:
      return [p, q, v];
    case 4:
      return [t, p, v];
    case 5:
      return [v, p, q];
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
function hex(symbol) {
  var hsv = goldenRatioColor();
  var rgbVal = hsv2rgb(hsv);
  var ret = rgb2hex(rgbVal[0], rgbVal[1], rgbVal[2]);
  return symbol ? '#' + ret : ret;
}

/**
 * rgb颜色 rgb(128,255,255)
 *
 * @export
 * @returns
 */
function rgb() {
  var hsv = goldenRatioColor();
  var ret = hsv2rgb(hsv);
  return 'rgb(' + parseInt(ret[0], 10) + ', ' + parseInt(ret[1], 10) + ', ' + parseInt(ret[2], 10) + ')';
}

/**
 * rgba颜色 rgba(128,255,255,0.3)
 *
 * @export
 * @returns
 */
function rgba() {
  var hsv = goldenRatioColor();
  var ret = hsv2rgb(hsv);
  return 'rgba(' + parseInt(ret[0], 10) + ', ' + parseInt(ret[1], 10) + ', ' + parseInt(ret[2], 10) + ', ' + Math.random().toFixed(2) + ')';
}

/**
 * hsl颜色 hsl(300,80%,90%)
 *
 * @export
 * @returns
 */
function hsl() {
  var hsv = goldenRatioColor();
  var ret = hsv2hsl(hsv);
  return 'hsl(' + parseInt(ret[0], 10) + ', ' + parseInt(ret[1], 10) + ', ' + parseInt(ret[2], 10) + ')';
}

/**
 * 随机生成一个有吸引力的颜色，格式为 '#RRGGBB'
 *
 * @export
 * @param {any} name
 * @returns
 */
function color(name) {
  if (name || DICT[name]) {
    return DICT[name];
  }
  return hex(true);
}

var DICT_KANZI = '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞';

/**
 * 生成区间内随机数
 *
 * @param {number} defaultMin
 * @param {number} defaultMax
 * @param {number} min
 * @param {number} max
 * @returns
 */
function range$1(defaultMin, defaultMax, min, max) {
  if (min === undefined) {
    return integer(defaultMin, defaultMax); // ()
  }

  if (max === undefined) {
    return min; // ( len )
  }

  return integer(min, max); // ( min, max )
}

/**
 * 随机生成一个单词
 *
 * @export
 * @param {number} min
 * @param {number} max
 * @returns
 */
function word(min, max) {
  var len = range$1(3, 10, min, max);
  var result = '';

  for (var i = 0; i < len; i++) {
    result += character('lower');
  }

  return result;
}

/**
 * 随机生成一个句子，第一个单词的首字母大写
 *
 * @export
 * @param {number} min
 * @param {number} max
 * @returns
 */
function sentence(min, max) {
  var len = range$1(12, 18, min, max);
  var result = [];

  for (var i = 0; i < len; i++) {
    result.push(word());
  }

  return capitalize(result.join(' ')) + '.';
}

/**
 * 随机生成一段文本
 *
 * @export
 * @param {number} min
 * @param {number} max
 * @returns
 */
function paragraph(min, max) {
  var len = range$1(3, 7, min, max);
  var result = [];

  for (var i = 0; i < len; i++) {
    result.push(sentence());
  }

  return result.join(' ');
}

/**
 * 随机生成一句标题，其中每个单词的首字母大写
 *
 * @export
 * @param {number} min
 * @param {number} max
 * @returns
 */
function title(min, max) {
  var len = range$1(3, 7, min, max);
  var result = [];

  for (var i = 0; i < len; i++) {
    result.push(capitalize(word()));
  }

  return result.join(' ');
}

/**
 * 随机生成一个或多个汉字
 *
 * @export
 * @param {string} pool
 * @param {number} min
 * @param {number} max
 */
function cword(pool, min, max) {
  var len = 1;

  switch (arguments.length) {
    case 0:
      // ()
      pool = DICT_KANZI;
      len = 1;
      break;
    case 1:
      // ( pool )
      if (typeof pool === 'string') {
        len = 1;
      } else {
        // ( length )
        len = pool;
        pool = DICT_KANZI;
      }
      break;
    case 2:
      // ( pool, length )
      if (typeof pool === 'string') {
        len = min;
      } else {
        // ( min, max )
        len = integer(pool, min);
        pool = DICT_KANZI;
      }
      break;
    case 3:
      len = integer(min, max);
      break;
    default:
  }

  var result = '';
  var poolLength = pool.length - 1;

  for (var i = 0; i < len; i++) {
    result += pool.charAt(integer(0, poolLength));
  }

  return result;
}

/**
 * 随机生成一个中文句子
 *
 * @export
 * @param {number} min
 * @param {number} max
 */
function csentence(min, max) {
  var len = range$1(12, 18, min, max);
  var result = [];

  for (var i = 0; i < len; i++) {
    result.push(cword());
  }

  return result.join('') + '\u3002';
}

/**
 * 随机生成一段中文文本
 *
 * @export
 * @param {number} min
 * @param {number} max
 * @returns
 */
function cparagraph(min, max) {
  var len = range$1(3, 7, min, max);
  var result = [];

  for (var i = 0; i < len; i++) {
    result.push(csentence());
  }

  return result.join('');
}

/**
 * 随机生成一句中文标题
 *
 * @export
 * @param {number} min
 * @param {number} max
 * @returns
 */
function ctitle(min, max) {
  var len = range$1(3, 7, min, max);
  var result = [];

  for (var i = 0; i < len; i++) {
    result.push(cword());
  }

  return result.join('');
}

// male
var nameMale = 'James John Robert Michael William David Richard Charles Joseph Thomas Christopher Daniel Paul Mark Donald George Kenneth Steven Edward Brian Ronald Anthony Kevin Jason Matthew Gary Timothy Jose Larry Jeffrey Frank Scott Eric';

// female
var nameFemale = 'Mary Patricia Linda Barbara Elizabeth Jennifer Maria Susan Margaret Dorothy Lisa Nancy Karen Betty Helen Sandra Donna Carol Ruth Sharon Michelle Laura Sarah Kimberly Deborah Jessica Shirley Cynthia Angela Melissa Brenda Amy Anna';

// first names
var firstNames = (nameMale + ' ' + nameFemale).split(' ');

// last names
var lastNames = 'Smith Johnson Williams Brown Jones Miller Davis Garcia Rodriguez Wilson Martinez Anderson Taylor Thomas Hernandez Moore Martin Jackson Thompson White Lopez Lee Gonzalez Harris Clark Lewis Robinson Walker Perez Hall Young Allen'.split(' ');

// 姓氏
var cfirstNames = '王李张刘陈杨赵黄周吴徐孙胡朱高林何郭马罗梁宋郑谢韩唐冯于董萧程曹袁邓许傅沈曾彭吕苏卢蒋蔡贾丁魏薛叶阎余潘杜戴夏锺汪田任姜范方石姚谭廖邹熊金陆郝孔白崔康毛邱秦江史顾侯邵孟龙万段雷钱汤尹黎易常武乔贺赖龚文'.split('');

// 名
var clastNames = '伟 芳 娜 秀英 敏 静 丽 强 磊 军 洋 勇 艳 杰 娟 涛 明 超 秀兰 霞 平 刚 桂英'.split(' ');

/**
 * 随机生成英文名
 *
 * @export
 * @returns
 */
function first() {
  return pick(firstNames);
}

/**
 * 随机生成英文姓氏
 *
 * @export
 * @returns
 */
function last() {
  return pick(lastNames);
}

/**
 * 随机生成英文姓名
 *
 * @export
 * @param {bool} middle 是否有中间名字
 * @returns
 */
function name(middle) {
  return first() + ' ' + (middle ? first() + ' ' : '') + last();
}

/**
 * 随机生成中文姓
 *
 * @export
 * @returns
 */
function cfirst() {
  return pick(cfirstNames);
}

/**
 * 随机生成中文名
 *
 * @export
 * @returns
 */
function clast() {
  return pick(clastNames);
}

/**
 * 随机生成中文姓名
 *
 * @export
 * @returns
 */
function cname() {
  return cfirst() + clast();
}

// 协议簇
var PROTOCOLS = ('' +
// 'http https ws wss ssh ftp gopher mailto mid cid news nntp prospero telnet rlogin tn3270 wais' +
// 选择几个常用的协议
'http https ws wss ftp' + '').split(' ');

// Top Level Domain
var TOP_LEVEL_DOMAINS = ('' +
// 'com net org edu gov int mil cn ' +
// 国内域名
// 'com.cn net.cn gov.cn org.cn ' +
// 中文国内域名
// '中国 中国互联.公司 中国互联.网络 ' +
// 新国际域名
// 'tel biz cc tv info name hk mobi asia cd travel pro museum coop aero ' +
// 世界各国域名后缀
// 'ad ae af ag ai al am an ao aq ar as at au aw az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bv bw by bz ca cc cf cg ch ci ck cl cm cn co cq cr cu cv cx cy cz de dj dk dm do dz ec ee eg eh es et ev fi fj fk fm fo fr ga gb gd ge gf gh gi gl gm gn gp gr gt gu gw gy hk hm hn hr ht hu id ie il in io iq ir is it jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md mg mh ml mm mn mo mp mq mr ms mt mv mw mx my mz na nc ne nf ng ni nl no np nr nt nu nz om qa pa pe pf pg ph pk pl pm pn pr pt pw py re ro ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr st su sy sz tc td tf tg th tj tk tm tn to tp tr tt tv tw tz ua ug uk us uy va vc ve vg vn vu wf ws ye yu za zm zr zw' +

// 以上域名赛选常用的几个
'com net org cn ' + 'com.cn net.cn gov.cn org.cn ' + 'tv tw jp' + '').split(' ');

/**
 * 随机生成一个 URL 协议
 *
 * @export
 * @param {string|array} protocols
 * @returns
 */
function protocol(protocols) {
  if (protocols) {
    protocols = typeof protocols === 'string' ? protocols.split(/[ ,]/) : protocols;
  } else {
    protocols = PROTOCOLS;
  }

  return pick(protocols || PROTOCOLS);
}

/**
 * 随机生成一个顶级域名
 *
 * @export
 * @param {string|array} topLevelDomains
 * @returns
 */
function tld(topLevelDomains) {
  if (topLevelDomains) {
    topLevelDomains = typeof topLevelDomains === 'string' ? topLevelDomains.split(/[ ,]/) : topLevelDomains;
  } else {
    topLevelDomains = TOP_LEVEL_DOMAINS;
  }

  return pick(topLevelDomains);
}

/**
 * 随机生成一个域名
 *
 * @export
 * @param {string} secondLevelDomain
 * @param {string} topLevelDomain
 * @returns
 */
function domain(secondLevelDomain, topLevelDomain) {
  var arr = [];

  if (secondLevelDomain) {
    arr.push(secondLevelDomain);
  }

  arr.push(word());
  arr.push(topLevelDomain || tld());

  return arr.join('.');
}

/**
 * 随机生成一个 URL
 *
 * @export
 * @param {string} protocolName
 * @param {string} host
 * @returns
 */
function url(protocolName, host) {
  return (protocolName || protocol()) + '://' + (host || domain()) + '/' + word();
}

/**
 * 随机生成一个邮件地址
 *
 * @export
 * @param {string} domain
 * @returns
 */
/* eslint no-shadow:0 */
function email(domain) {
  return character('lower') + '.' + word() + '@' + (domain || word() + '.' + tld());
}

/**
 * 随机生成一个 IP 地址
 *
 * @export
 * @returns
 */
function ip() {
  return integer(1, 254) + '.' + integer(0, 255) + '.' + integer(0, 255) + '.' + integer(1, 254);
}

var DICT$1 = {
  110000: '北京',
  110100: '北京市',
  110101: '东城区',
  110102: '西城区',
  110105: '朝阳区',
  110106: '丰台区',
  110107: '石景山区',
  110108: '海淀区',
  110109: '门头沟区',
  110111: '房山区',
  110112: '通州区',
  110113: '顺义区',
  110114: '昌平区',
  110115: '大兴区',
  110116: '怀柔区',
  110117: '平谷区',
  310000: '上海',
  310100: '上海市',
  310101: '黄浦区',
  310107: '普陀区',
  310109: '虹口区',
  310110: '杨浦区',
  310115: '浦东新区',
  310117: '松江区',
  320000: '江苏省',
  320100: '南京市',
  320102: '玄武区',
  320104: '秦淮区',
  320105: '建邺区',
  320106: '鼓楼区',
  320111: '浦口区',
  320113: '栖霞区',
  320115: '江宁区',
  320116: '六合区',
  330000: '浙江省',
  330100: '杭州市',
  330102: '上城区',
  330103: '下城区',
  330104: '江干区',
  330105: '拱墅区',
  330106: '西湖区',
  330108: '滨江区',
  330109: '萧山区',
  330110: '余杭区',
  330122: '桐庐县',
  330127: '淳安县',
  330182: '建德市',
  330183: '富阳市',
  330185: '临安市',
  330200: '宁波市',
  330203: '海曙区',
  330225: '象山县',
  330226: '宁海县',
  330281: '余姚市',
  330282: '慈溪市',
  330283: '奉化市',
  330300: '温州市',
  330302: '鹿城区',
  330303: '龙湾区',
  330304: '瓯海区',
  330322: '洞头县',
  330324: '永嘉县',
  330328: '文成县',
  330329: '泰顺县',
  330381: '瑞安市',
  350000: '福建省',
  350200: '厦门市',
  350203: '思明区',
  350205: '海沧区',
  350206: '湖里区',
  350211: '集美区',
  350212: '同安区',
  350213: '翔安区',
  370000: '山东省',
  370200: '青岛市',
  370202: '市南区',
  370203: '市北区',
  370211: '黄岛区',
  370212: '崂山区',
  370213: '李沧区',
  370214: '城阳区',
  370281: '胶州市',
  370283: '平度市',
  440000: '广东省',
  440100: '广州市',
  440105: '海珠区',
  440106: '天河区',
  440111: '白云区',
  440114: '花都区',
  440115: '南沙区',
  440300: '深圳市',
  440303: '罗湖区',
  440304: '福田区',
  440305: '南山区',
  440306: '宝安区',
  440307: '龙岗区',
  440308: '盐田区',
  440400: '珠海市',
  440402: '香洲区',
  440403: '斗门区',
  440404: '金湾区',
  440488: '其它区',
  460000: '海南省',
  460100: '海口市',
  460105: '秀英区',
  460106: '龙华区',
  460107: '琼山区',
  460108: '美兰区',
  460109: '其它区',
  460200: '三亚市',
  500000: '重庆',
  500100: '重庆市',
  500101: '万州区',
  500102: '涪陵区',
  500103: '渝中区',
  500105: '江北区',
  500106: '沙坪坝区',
  500107: '九龙坡区',
  500112: '渝北区',
  510000: '四川省',
  510100: '成都市',
  510104: '锦江区',
  510107: '武侯区',
  510112: '龙泉驿区',
  510113: '青白江区',
  510122: '双流县',
  510181: '都江堰市',
  510182: '彭州市'
};

/**
 * 生成树状结构
 *
 * @param {array} list
 * @returns
 */
function tree(list) {
  var mapped = {}; // { id: name } 形式方便取值

  list.forEach(function (it) {
    mapped[it.id] = it;
  });

  var result = [];

  list.forEach(function (it) {
    if (it.pid === '') {
      result.push(it);
    } else {
      var parent = mapped[it.pid];
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(it);
      }
    }
  });

  return result;
}

/**
 * 解析数据父节点ID
 *
 * @param {array} dist
 * @returns
 */
function parse(dist) {
  return Object.keys(dist).map(function (id) {
    var pid = void 0;

    if (id.slice(2, 6) === '0000') {
      pid = '';
    } else if (id.slice(4, 6) === '00') {
      pid = id.slice(0, 2) + '0000';
    } else {
      pid = id.slice(0, 4) + '00';
    }

    return { id: id, pid: pid, name: dist[id] };
  });
}

var DICT$2 = tree(parse(DICT$1));

var REGION = ['东北', '华北', '华东', '华中', '华南', '西南', '西北'];

// 暴露出去，方便插件使用
var ADDRESS_DICT = DICT$2;

/**
 * 随机生成一个大区
 *
 * @export
 * @returns
 */
function region() {
  return pick(REGION);
}

/**
 * 随机生成一个（中国）省（或直辖市、自治区、特别行政区）
 *
 * @export
 * @returns
 */
function province() {
  return pick(DICT$2).name;
}

/**
 * 随机生成一个（中国）市
 *
 * @export
 * @param {bool} prefix
 * @returns
 */
function city(prefix) {
  var provinceItem = pick(DICT$2);
  var cityItem = pick(provinceItem.children);
  return prefix ? [provinceItem.name, cityItem.name].join(' ') : cityItem.name;
}

/**
 * 随机生成一个（中国）县
 *
 * @export
 * @param {bool} prefix
 * @returns
 */
function county(prefix) {
  var provinceItem = pick(DICT$2);
  var cityItem = pick(provinceItem.children);
  var countyItem = pick(cityItem.children) || { name: '-' };
  return prefix ? [provinceItem.name, cityItem.name, countyItem.name].join(' ') : countyItem.name;
}

/**
 * 随机生成一个邮政编码（六位数字）
 *
 * @export
 * @param {number} len
 * @returns
 */
function zip(len) {
  return string('number', len || 6);
}

/**
 * 随机生成一个 GUID (uuid v4)
 *
 * @export
 * @returns
 *
 * @see https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript#answer-2117523
 */
function uuid() {
  /* eslint no-bitwise:0 */
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

/**
 * 随机生成一个 GUID
 *
 * @export
 * @returns
 */
var guid = uuid;

/**
 * 随机生成一个 18 位身份证
 *
 * @export
 */
function id() {
  var rank = '7910584216379105842';
  var last = '10X98765432';

  var sum = 0;
  var idcard = pick(DICT$2).id + date('yyyyMMdd') + string('number', 3);

  for (var i = 0; i < idcard.length; i++) {
    sum += idcard[i] * rank[i];
  }

  idcard += last[sum % 11]; // 效验码

  return idcard;
}

/* 自增变量 */
var incrementKey = 0;

/**
 * 生成一个全局的自增整数
 * 类似自增主键（auto increment primary key）
 *
 * @export
 * @returns
 */
function increment(step) {
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
var inc = increment;

/**
 * 随机生成一个国内手机号码
 *
 * @export
 * @returns
 */
function mobile() {
  return '1' + character('34578') + string('number', 9);
}

/**
 * 插件模块
 *
 * 目前试验阶段，还未正式定型
 */

/* eslint import/prefer-default-export: 0 */
var plugins = {};



var Random = Object.freeze({
	capitalize: capitalize,
	upper: upper,
	lower: lower,
	shuffle: shuffle,
	pick: pick,
	integer: integer,
	int: int,
	boolean: boolean,
	bool: bool,
	float: float,
	character: character,
	char: char,
	string: string,
	str: str,
	range: range,
	date: date,
	time: time,
	datetime: datetime,
	now: now,
	setImageHost: setImageHost,
	image: image,
	COLOR_DICT: COLOR_DICT,
	hex: hex,
	rgb: rgb,
	rgba: rgba,
	hsl: hsl,
	color: color,
	word: word,
	sentence: sentence,
	paragraph: paragraph,
	title: title,
	cword: cword,
	csentence: csentence,
	cparagraph: cparagraph,
	ctitle: ctitle,
	first: first,
	last: last,
	name: name,
	cfirst: cfirst,
	clast: clast,
	cname: cname,
	protocol: protocol,
	tld: tld,
	domain: domain,
	url: url,
	email: email,
	ip: ip,
	ADDRESS_DICT: ADDRESS_DICT,
	region: region,
	province: province,
	city: city,
	county: county,
	zip: zip,
	uuid: uuid,
	guid: guid,
	id: id,
	increment: increment,
	inc: inc,
	mobile: mobile,
	plugins: plugins
});

/* eslint no-confusing-arrow:0 */
/* eslint no-underscore-dangle:0 */

/**
 * Object#toString
 *
 * @function toString
 */
var toString = Object.prototype.toString;
/**
 * Object#hasOwnProperty
 *
 * @function toString
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * 获取数据类型
 *
 * @param {any} any
 * @returns {string}
 */
function type(any) {
  return toString.call(any).slice(8, -1).toLowerCase();
}

/**
 * 匹配键名处理
 *
 * @param {any} key
 * @param {any} re
 * @returns
 */
function match(key, re) {
  if (type(key) !== 'string') {
    return null;
  }
  return key.match(re);
}

/**
 * 占位符处理
 *
 * @param {string} holder
 * @param {string} param
 * @returns
 */
function placeholder(all, holder, param, opts) {
  // 优先使用兄弟节点值
  if (opts.parent && hasOwnProperty.call(opts.parent, holder)) {
    return opts.parent[holder];
  }

  // 如果没有工具方法则返回所有
  if (!hasOwnProperty.call(Random, holder) && !hasOwnProperty.call(plugins, holder)) {
    return all;
  }

  var params = [];

  if (param) {
    try {
      /* eslint no-new-func:0 */
      params = new Function('return [' + param + ']')();
    } catch (err) {
      // noop
    }
  }

  // 调用占位符方法
  var fn = Random[holder] || plugins[holder];
  /* eslint prefer-spread: 0 */
  return fn.apply(null, params);
}

// 数据类型处理器
var processors = {
  // 对象处理
  object: function object(tpl, key, opts) {
    // 'name|count': object
    // 'name|min-max': object
    var ret = {};
    var keys = Object.keys(tpl);
    var length = keys.length;
    var count = length;
    var m = match(key, /\|(\d+)(?:-(\d+))?/);

    if (m) {
      if (m[2]) {
        count = int(m[1], m[2]);
      } else {
        count = +m[1];
      }
    }

    opts.parentTpl = tpl; // 带上当前对象
    opts.parent = ret; // 当前解析后的对象

    if (count >= length) {
      // 函数放末尾处理 'name': function
      keys.sort(function (k) {
        return type(k) === 'function' ? 1 : 0;
      });
      // 处理全部
      keys.forEach(function (it) {
        ret[it.replace(/\|.+/, '')] = generator(tpl[it], it, opts);
      });
    } else {
      // 随机抽取 (简单洗牌)
      keys.sort(function () {
        return Math.random() < 0.5 ? -1 : 1;
      }).slice(0, count).forEach(function (it) {
        ret[it.replace(/\|.+/, '')] = generator(tpl[it], it, opts);
      });
    }

    return ret;
  },


  // 数组处理
  array: function array(tpl, key, opts) {
    // 'name|1': array
    // 'name|+1': array
    // 'name|min-max': array
    // 'name|count': array
    var result = [];
    var length = tpl.length;

    // 处理空数组
    if (length === 0) {
      return result;
    }

    var count = 0;
    var m = match(key, /\|(\+)?(\d+)(?:-(\d+))?/);

    if (m) {
      if (m[2] === '1' && m[3] === undefined) {
        if (m[1] === '+') {
          // 'name|+1': array
          var idx = tpl._idx || 0;
          if (idx >= length) {
            idx = 0;
          }
          result = generator(tpl[idx], idx, opts);
          tpl._idx = idx + 1;
        } else {
          // 'name|1': array
          var _idx = int(0, length - 1);
          result = generator(tpl[_idx], _idx, opts);
        }
        return result;
      } else if (m[3]) {
        count = int(m[2], m[3]);
      } else {
        count = +m[2];
      }
    }

    if (count === 0) {
      tpl.forEach(function (it, idx) {
        return result.push(generator(it, idx, opts));
      });
    } else {
      var _loop = function _loop(i) {
        tpl.forEach(function (it) {
          return result.push(generator(it, i, opts));
        });
      };

      // 重复 count 次
      for (var i = 0; i < count; i += 1) {
        _loop(i);
      }
    }

    return result;
  },


  // 数字处理
  number: function number(tpl, key, opts) {
    // 'name|+number': number
    // 'name|min-max': number
    // 'name|min-max.dmin-dmax': number
    // 'name|number.dmin-dmax': number
    var m = match(key, /\|([+-]?\d+)(?:-([-]?\d+))?(?:\.(\d+)(?:-(\d+))?)?/);

    if (!m) {
      return tpl; // 没有匹配到
    }

    // 'name|+number': number
    if (m[1][0] === '+') {
      opts.parentTpl[key] += parseInt(m[1], 10); // 父节点数据累加
      return tpl;
    }

    // 'name|min-max.dmin-dmax': number
    if (m[3] || m[4]) {
      return float(m[1], m[2], m[3], m[4]);
    }

    // 'name|min-max': number
    if (m[2]) {
      return int(m[1], m[2]);
    }

    return tpl;
  },


  // 字符串处理
  string: function string$$1(tpl, key, opts) {
    // 'name|min-max': string  重复 string 字符串 min-max 次
    // 'name|count': string  重复 string 字符串 count次
    var count = 0; // 重复次数
    var m = match(key, /\|(\d+)(?:-(\d+))?/); // 匹配key

    if (m) {
      if (m[2]) {
        // 'name|min-max': string
        count = int(m[1], m[2]);
      } else {
        // 'name|count': string
        count = +m[1];
      }
    }

    var str$$1 = tpl;

    // 'name|min-max': '' or 'name|count': ''
    if (tpl === '') {
      return string('alpha', count || undefined);
    }

    if (count) {
      str$$1 = Array(count + 1).join(tpl); // 重复N次
    }

    var mHolder = str$$1.match(/^@(\w+)(?:\(([^)]*)\))?$/);

    if (mHolder) {
      // 'name': '@now(true)'
      // 单占位符处理 (保持数据类型)
      return placeholder(str$$1, mHolder[1], mHolder[2], opts);
    }

    // 'name': '@date @now @name'
    // 多占位符处理 (输出字符串)
    str$$1 = str$$1.replace(/@(\w+)(?:\(([^)]*)\))?/g, function (all, holder, param) {
      return placeholder(all, holder, param, opts);
    });

    return str$$1;
  },


  // 布尔值处理
  boolean: function boolean$$1(tpl, key) {
    // 'name|min-max': boolean  1/min-max 的概率返回 boolean 的值
    // 'name|count': boolean  1/count 概率返回 boolean 的值
    var m = match(key, /\|(\d+)(?:-(\d+))?/); // 匹配key
    return m ? bool(m[1], m[2], tpl) : tpl;
  },


  // 函数处理 (异步处理，为了获取完整 root 对象)
  function: function _function(fn, key, opts) {
    // 'name': function
    opts.callbacks.push({ fn: fn, key: key, parent: opts.parent });
    return '[Waiting for callback processing...]';
  }
};

/**
 * 数据生成器入口
 *
 * @export
 * @param {any} data mock 模板数据
 * @param {string} key 当前数据的 key
 * @param {object} opts 公用数据
 * @returns {any}
 */
function generator(data, key, opts) {
  var processor = processors[type(data)];
  return processor ? processor(data, key, opts) : data;
}

/**
 * mock入口
 *
 * @param {any} any
 * @returns
 */
function mock(any) {
  var opts = { rootTpl: any, callbacks: [] };
  var root = generator(any, '', opts);

  // 处理函数回调
  opts.callbacks.forEach(function (opt) {
    // this 是当前父节点对象，root 是跟对象
    opt.parent[opt.key] = opt.fn.call(opt.parent, root);
  });

  return root;
}

/**
 * 插件扩展 (试验阶段)
 *
 * @export
 * @param {function} plugin
 */
function use(plugin) {
  plugin(plugins, processors, Random);
}

// 默认导出
var mock$1 = {
  mock: mock,
  use: use,
  Random: Random
};

exports.Random = Random;
exports.mock = mock;
exports.use = use;
exports['default'] = mock$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mock.js.map
