import generator, { Random, processors } from './generator';

// 导出工具对象
export { Random };

/**
 * mock入口
 *
 * @param {any} any
 * @returns
 */
export function mock(any) {
  const opts = { rootTpl: any, callbacks: [] };
  const root = generator(any, '', opts);

  // 处理函数回调
  opts.callbacks.forEach((opt) => {
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
export function use(plugin) {
  plugin(Random.plugins, processors, Random);
}

// 默认导出
export default {
  mock,
  use,
  Random,
};
