import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from "rollup-plugin-uglify";

export default {
  output: {
    file: `dist/mvvm.min.js`,
    format: 'umd',
    name: 'Mvvm',
  },
  plugins: [
    resolve(),
    uglify(),
    babel({
      exclude: 'node_modules/**', // only transpile our source code
    })
  ],
};