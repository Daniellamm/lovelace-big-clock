import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';

export default [
  {
    input: 'src/BigClock.ts',
    output: {
      dir: 'dist',
      format: 'es',
    },
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript(),
      json(),
      terser(),
    ],
  },
];
