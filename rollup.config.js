import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import { version } from './package.json';

const NODE_ENV = process.env.NODE_ENV;
const plugins = [babel()];
let fileName = 'mock.js';

if (NODE_ENV === 'production') {
  plugins.push(uglify());
  fileName = 'mock.min.js';
}

const banner = `
/*!
 * Mockjs-lite v${version}
 * (c) 2017-${new Date().getFullYear()} 楼教主 <fe.52cik@gmail.com> (https://github.com/52cik/mockjs-lite)
 * Released under the MIT License.
 */
`.trim();

export default {
  entry: 'src/mock.js',
  format: 'umd',
  exports: 'named',
  moduleName: 'Mock',
  dest: `dist/${fileName}`,
  sourceMap: true,
  plugins,
  banner,
};
