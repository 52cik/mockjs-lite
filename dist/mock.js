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

var Random = _extends({}, basic);

/* eslint no-confusing-arrow:0 */
/* eslint no-underscore-dangle:0 */

/**
 * Object#toString
 *
 * @function toString
 */
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

// 生成器包装
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
