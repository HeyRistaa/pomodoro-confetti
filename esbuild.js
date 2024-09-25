const esbuild = require('esbuild');

const watch = process.argv.includes('--watch');
const minify = process.argv.includes('--minify');

esbuild.build({
  entryPoints: ['./src/extension.ts'],
  bundle: true,
  outfile: 'dist/extension.js',
  external: ['vscode'],
  format: 'cjs',
  platform: 'node',
  watch,
  minify,
}).catch(() => process.exit(1));