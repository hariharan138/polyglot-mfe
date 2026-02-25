import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

export default {
  input: 'wc/wc-entry.tsx',
  output: {
    file: 'public/wc/nextjs-body.js',
    format: 'iife',
    name: 'NextJsBodyWC',
    intro: 'var process = { env: { NODE_ENV: "production" } };',
  },
  plugins: [
    replace({
      "'use client';": "/* use client (stripped for WC bundle) */",
      include: '**/MainBody.tsx',
      preventAssignment: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true,
    }),
    resolve({ browser: true }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.wc.json',
      outputToFilesystem: false,
    }),
  ],
};
