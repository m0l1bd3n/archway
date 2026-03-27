import esbuild from 'esbuild';
import { resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';

const buildTargets = {
  server: {
    entry: './server/index.ts',
    outDir: '../packages/core',
    platform: 'node'
  },
  client: {
    entry: './client/index.ts',
    outDir: '../client_packages',
    platform: 'node'
  }
};

const target = process.argv[2];

const { entry, outDir, platform } = buildTargets[target];

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

esbuild
  .build({
    entryPoints: [resolve(entry)],
    outfile: resolve(outDir, 'index.js'),
    bundle: true,
    minify: true,
    sourcemap: false,
    platform: platform,
    target: 'esnext',
    format: 'cjs'
  })
  .then(() => {
    console.log(`${target} успешно собран в ${outDir}/index.js`);
  })
  .catch((error) => {
    console.error(`Ошибка сборки ${target}:`, error);
    process.exit(1);
  });
