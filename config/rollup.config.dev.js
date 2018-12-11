import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  output: {
    file: `dist/mvvm.js`,
    format: 'umd',
    name: 'Mvvm',
  },
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
    })
  ],
};