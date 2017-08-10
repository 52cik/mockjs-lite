import test from 'ava';
import { Random } from '../..';

// 姓氏
const cfirstNames = '王李张刘陈杨赵黄周吴徐孙胡朱高林何郭马罗梁宋郑谢韩唐冯于董萧程曹袁邓许傅沈曾彭吕苏卢蒋蔡贾丁魏薛叶阎余潘杜戴夏锺汪田任姜范方石姚谭廖邹熊金陆郝孔白崔康毛邱秦江史顾侯邵孟龙万段雷钱汤尹黎易常武乔贺赖龚文'.split(
  '',
);

// 名
const clastNames = '伟 芳 娜 秀英 敏 静 丽 强 磊 军 洋 勇 艳 杰 娟 涛 明 超 秀兰 霞 平 刚 桂英'.split(' ');

/* Random name */
test('Random.first', (t) => {
  t.regex(Random.first(), /^[A-Z][a-z]+$/);
});

test('Random.last', (t) => {
  t.regex(Random.last(), /^[A-Z][a-z]+$/);
});

test('Random.name', (t) => {
  t.regex(Random.name(), /^([A-Z][a-z]+ ?){2}$/);
  t.regex(Random.name(true), /^([A-Z][a-z]+ ?){3}$/);
});

test('Random.cfirst', (t) => {
  t.true(cfirstNames.indexOf(Random.cfirst()) > -1);
});

test('Random.clast', (t) => {
  t.true(clastNames.indexOf(Random.clast()) > -1);
});

test('Random.cname', (t) => {
  t.regex(Random.cname(), /^[\u4e00-\u9fa5]{2,3}$/);
});
