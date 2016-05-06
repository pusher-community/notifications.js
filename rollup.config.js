import babel from 'rollup-plugin-babel';
import commonJS from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

const sharedPlugins = [
    nodeResolve(),
    commonJS({
      include: 'node_modules/**'
    }),
    babel({
      exclude: 'node_modules/**',
      presets: ['es2015-rollup'],
      babelrc: false
    }),
];

if (process.env.MINIFY) {
  sharedPlugins.push(uglify());
}

const destination = process.env.MINIFY ?
  'lib/notifications.min.js' :
  'lib/notifications.js';

export default {
  entry: 'src/main.js',
  dest: destination,
  format: 'umd',
  moduleName: 'Notifications',
  plugins: sharedPlugins
};
