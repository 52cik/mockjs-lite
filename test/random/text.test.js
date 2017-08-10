import test from 'ava';
import { Random } from '../..';

/* Random text */
test('Random.word', (t) => {
  t.regex(Random.word(), /^[a-z]{3,10}$/);
  t.regex(Random.word(5), /^[a-z]{5}$/);
  t.regex(Random.word(5, 8), /^[a-z]{5,8}$/);
});

test('Random.sentence', (t) => {
  t.regex(Random.sentence(), /^[A-Z][a-z ]{46,196}\.$/);
  t.regex(Random.sentence(5), /^[A-Z][a-z ]{18,53}\.$/);
  t.regex(Random.sentence(5, 8), /^[A-Z][a-z ]{18,86}\.$/);
});

test('Random.paragraph', (t) => {
  t.regex(Random.paragraph(), /^([A-Z][a-z ]{46,196}\.\s?){3,7}$/);
  t.regex(Random.paragraph(5), /^([A-Z][a-z ]{46,196}\.\s?){5}$/);
  t.regex(Random.paragraph(5, 8), /^([A-Z][a-z ]{46,196}\.\s?){5,8}$/);
});

test('Random.title', (t) => {
  t.regex(Random.title(), /^([A-Z][a-z]{2,9}\s?){3,7}$/);
  t.regex(Random.title(5), /^([A-Z][a-z]{2,9}\s?){5}$/);
  t.regex(Random.title(5, 8), /^([A-Z][a-z]{2,9}\s?){5,8}$/);
});

test('Random.cword', (t) => {
  t.regex(Random.cword(), /^[\u4e00-\u9f99]$/);
  t.regex(Random.cword(5), /^[\u4e00-\u9f99]{5}$/);
  t.regex(Random.cword(5, 8), /^[\u4e00-\u9f99]{5,8}$/);

  t.regex(Random.cword('零一二三四五六七八九十'), /^[零一二三四五六七八九十]$/);
  t.regex(Random.cword('零一二三四五六七八九十', 5), /^[零一二三四五六七八九十]{5}$/);
  t.regex(Random.cword('零一二三四五六七八九十', 5, 8), /^[零一二三四五六七八九十]{5,8}$/);
});

test('Random.csentence', (t) => {
  t.regex(Random.csentence(), /^[\u4e00-\u9f99]{12,18}。$/);
  t.regex(Random.csentence(5), /^[\u4e00-\u9f99]{5}。$/);
  t.regex(Random.csentence(5, 8), /^[\u4e00-\u9f99]{5,8}。$/);
});

test('Random.cparagraph', (t) => {
  t.regex(Random.cparagraph(), /^([\u4e00-\u9f99]{12,18}。){3,7}$/);
  t.regex(Random.cparagraph(5), /^([\u4e00-\u9f99]{12,18}。){5}$/);
  t.regex(Random.cparagraph(5, 8), /^([\u4e00-\u9f99]{12,18}。){5,8}$/);
});

test('Random.ctitle', (t) => {
  t.regex(Random.ctitle(), /^[\u4e00-\u9f99]{3,7}$/);
  t.regex(Random.ctitle(5), /^[\u4e00-\u9f99]{5}$/);
  t.regex(Random.ctitle(5, 8), /^[\u4e00-\u9f99]{5,8}$/);
});
