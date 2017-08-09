/*!
 * Mockjs-lite v0.1.0
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
  var ret = (max ? integer(min, max) : min) + '.' + string('number', dcount - 1) + character('123456789');
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

var basic = Object.freeze({
	integer: integer,
	int: int,
	boolean: boolean,
	bool: bool,
	float: float,
	character: character,
	char: char,
	string: string,
	str: str,
	range: range
});

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
function randomDate() {
  var min = new Date(0); // 1970-01-01
  var max = new Date();
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
function date(format) {
  return dateFormat(format || 'yyyy-MM-dd', randomDate());
}

/**
 * 时分秒部分格式化
 *
 * @export
 * @param {string} format
 * @returns
 */
function time(format) {
  return dateFormat(format || 'hh:mm:ss', randomDate());
}

/**
 * 完整时间部分格式化
 *
 * @export
 * @param {string} format
 * @returns
 */
function datetime(format) {
  return dateFormat(format || 'yyyy-MM-dd hh:mm:ss', randomDate());
}

/**
 * 当前时间格式化
 *
 * @export
 * @param {string} format
 * @returns
 */
function now(format) {
  return dateFormat(format || 'yyyy-MM-dd hh:mm:ss', new Date());
}

var date$1 = Object.freeze({
	date: date,
	time: time,
	datetime: datetime,
	now: now
});

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

var helper = Object.freeze({
	capitalize: capitalize,
	upper: upper,
	lower: lower,
	shuffle: shuffle,
	pick: pick
});

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

var image$1 = Object.freeze({
	setImageHost: setImageHost,
	image: image
});

/**
 * Color 字典数据
 *
 * 字典数据来源 [A nicer color palette for the web](http://clrs.cc/)
 */
var DICT = {
  // name value nicer
  navy: {
    value: '#000080',
    nicer: '#001F3F'
  },
  blue: {
    value: '#0000ff',
    nicer: '#0074D9'
  },
  aqua: {
    value: '#00ffff',
    nicer: '#7FDBFF'
  },
  teal: {
    value: '#008080',
    nicer: '#39CCCC'
  },
  olive: {
    value: '#008000',
    nicer: '#3D9970'
  },
  green: {
    value: '#008000',
    nicer: '#2ECC40'
  },
  lime: {
    value: '#00ff00',
    nicer: '#01FF70'
  },
  yellow: {
    value: '#ffff00',
    nicer: '#FFDC00'
  },
  orange: {
    value: '#ffa500',
    nicer: '#FF851B'
  },
  red: {
    value: '#ff0000',
    nicer: '#FF4136'
  },
  maroon: {
    value: '#800000',
    nicer: '#85144B'
  },
  fuchsia: {
    value: '#ff00ff',
    nicer: '#F012BE'
  },
  purple: {
    value: '#800080',
    nicer: '#B10DC9'
  },
  silver: {
    value: '#c0c0c0',
    nicer: '#DDDDDD'
  },
  gray: {
    value: '#808080',
    nicer: '#AAAAAA'
  },
  black: {
    value: '#000000',
    nicer: '#111111'
  },
  white: {
    value: '#FFFFFF',
    nicer: '#FFFFFF'
  }
};

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
    return DICT[name].nicer;
  }
  return hex(true);
}

var color$1 = Object.freeze({
	hex: hex,
	rgb: rgb,
	rgba: rgba,
	hsl: hsl,
	color: color
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var Random = _extends({}, basic, date$1, image$1, color$1, helper);

var toString = Object.prototype.toString;

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

// 处理根据
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
        count = Random.int(m[1], m[2]);
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
          var _idx = Random.int(0, length - 1);
          result = generator(tpl[_idx], _idx, opts);
        }
        return result;
      } else if (m[3]) {
        count = Random.int(m[2], m[3]);
      } else {
        count = +m[2];
      }
    }

    // 重复 count 次

    var _loop = function _loop(i) {
      tpl.forEach(function (it) {
        return result.push(generator(it, i, opts));
      });
    };

    for (var i = 0; i < count; i += 1) {
      _loop(i);
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
      return Random.float(m[1], m[2], m[3], m[4]);
    }

    // 'name|min-max': number
    if (m[2]) {
      return Random.int(m[1], m[2]);
    }

    return tpl;
  },


  // 字符串处理
  string: function string(tpl, key) {
    // 'name|min-max': string  重复 string 字符串 min-max 次
    // 'name|count': string  重复 string 字符串 count次
    var count = 0; // 重复次数
    var m = match(key, /\|(\d+)(?:-(\d+))?/); // 匹配key

    if (m) {
      if (m[2]) {
        // 'name|min-max': string
        count = Random.int(m[1], m[2]);
      } else {
        // 'name|count': string
        count = +m[1];
      }
    }

    var str = tpl;

    // 'name|min-max': '' or 'name|count': ''
    if (tpl === '') {
      return Random.string('alpha', count || undefined);
    }

    if (count) {
      str = Array(count + 1).join(tpl); // 重复N次
    }

    // TODO: 占位符处理

    return str;
  },


  // 布尔值处理
  boolean: function boolean(tpl, key) {
    // 'name|min-max': boolean  1/min-max 的概率返回 boolean 的值
    // 'name|count': boolean  1/count 概率返回 boolean 的值
    var m = match(key, /\|(\d+)(?:-(\d+))?/); // 匹配key
    return m ? Random.bool(m[1], m[2], tpl) : tpl;
  },


  // 函数处理 (异步处理，为了获取完整 root 对象)
  function: function _function(fn, key, opts) {
    // 'name': function
    opts.callbacks.push({ fn: fn, key: key, parent: opts.parent });
    return '[Waiting for callback processing...]';
  }
};

function generator(data, key, opts) {
  var processor = processors[type(data)];
  return processor ? processor(data, key, opts) : data;
}

var Mock = {
  mock: function mock(any) {
    var opts = { rootTpl: any, callbacks: [] };
    var root = generator(any, '', opts);

    // 处理函数回调
    opts.callbacks.forEach(function (opt) {
      // this 是当前父节点对象，root 是跟对象
      opt.parent[opt.key] = opt.fn.call(opt.parent, root);
    });

    return root;
  }
};

exports.Random = Random;
exports.Mock = Mock;
exports['default'] = Mock;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=mock.js.map
