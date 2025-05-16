import svelte from 'rollup-plugin-svelte'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import terser from '@rollup/plugin-terser'
import postcss from 'postcss'

export default {
  input: 'src/main.js',
  output: {
    file: 'public/build/bundle.js',
    format: 'iife',
    name: 'app',
    sourcemap: 'true'
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev: true,
        runes: true // ← Necesario para Svelte 5+
      }
    }),
    nodeResolve({
      browser: true,
      exportConditions: ['svelte']
    }),
    // css({ output: 'bundle.css' }),
    nodeResolve({ browser: true, dedupe: ['svelte'] }),
    terser(),
    postcss({
      extract: true,
      minimize: true,
      plugins: [require('tailwindcss'), require('autoprefixer')]
    }),
    serve({
      contentBase: 'public',
      port: 5000,
      open: true // Open browser
    })
    // livereload('public') // reload on changes
  ],
  onwarn: (warning, defaultHandler) => {
    // Ignorar warnings de dependencias circulares en Svelte
    if (
      warning.code === 'CIRCULAR_DEPENDENCY' &&
      warning.message.includes('node_modules/svelte')
    )
      return
    defaultHandler(warning)
  }
}
