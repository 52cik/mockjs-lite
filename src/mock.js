import generator, { Random } from './generator';

// 导出工具对象
export { Random };

// 生成器包装
export const Mock = {
  mock(any) {
    const opts = { rootTpl: any, callbacks: [] };
    const root = generator(any, '', opts);

    // 处理函数回调
    opts.callbacks.forEach((opt) => {
      // this 是当前父节点对象，root 是跟对象
      opt.parent[opt.key] = opt.fn.call(opt.parent, root);
    });

    return root;
  },
};

export default Mock;
