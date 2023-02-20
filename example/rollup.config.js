import { defineConfig } from "rollup";
import aliasPath from '@vascent/npm-test03'

export default defineConfig({
  input: './index.js',
  output: {
    dir: './dist',
    format: 'esm',
  },
  plugins: [
    aliasPath({
      options: [
        {
          alias: '@',
          replacement: './utils'
        }
      ]
    })
  ]
})
