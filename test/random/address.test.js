import test from 'ava';
import { Random } from '../..';

const reProvince = /^(北京|天津|河北省|山西省|内蒙古自治区|辽宁省|吉林省|黑龙江省|上海|江苏省|浙江省|安徽省|福建省|江西省|山东省|河南省|湖北省|湖南省|广东省|广西壮族自治区|海南省|重庆|四川省|贵州省|云南省|西藏自治区|陕西省|甘肃省|青海省|宁夏回族自治区|新疆维吾尔自治区|台湾|香港特别行政区|澳门特别行政区|海外)/;

/* Random address */
test('Random.region', (t) => {
  t.regex(Random.region(), /^(东北|华北|华东|华中|华南|西南|西北)$/);
});

test('Random.province', (t) => {
  t.regex(Random.province(), reProvince);
});

test('Random.city', (t) => {
  t.regex(Random.city(), /^.+$/);
  t.regex(Random.city(true), reProvince);
});

test('Random.county', (t) => {
  t.regex(Random.county(), /^.+$/);
  t.regex(Random.county(true), reProvince);
});

test('Random.zip', (t) => {
  t.regex(Random.zip(), /^\d{6}$/);
  t.regex(Random.zip(10), /^\d{10}/);
});
