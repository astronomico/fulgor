import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import css from 'rollup-plugin-css-only'

export default {
  input: 'src/main.js',
  output: {
    file: 'public/build/bundle.js',
    format: 'iife',
    name: 'app',
    sourcemap: 'true'
  },
  plugins: [
    svelte({ compilerOptions: { dev: true } }),
    css({ output: 'bundle.css' }),
    resolve({ browser: true, dedupe: ['svelte'] }),
    terser()
  ]
}
