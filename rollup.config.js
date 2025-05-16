import svelte from 'rollup-plugin-svelte'
import resolve from '@rollup/plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import terser from '@rollup/plugin-terser'
import postcss from 'postcss'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/main.js',
  output: {
    file: 'public/build/bundle.js',
    format: 'iife',
    name: 'app',
    sourcemap: !production
  },
  plugins: [
    svelte({
      compilerOptions: {
        dev: !production,
        runes: true // ← Necesario para Svelte 5+
      }
    }),
    // nodeResolve({
    //   browser: true,
    //   exportConditions: ['svelte']
    // }),
    // css({ output: 'bundle.css' }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
      exportConditions: ['svelte']
    }),
    terser(),
    postcss({
      extract: true,
      minimize: production,
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
