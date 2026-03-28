import esbuild from 'esbuild';
import { resolve } from 'path';
import { existsSync, mkdirSync, copyFileSync } from 'fs';

const buildTargets = {
  server: {
    entry: './sources/server/index.ts',
    outDir: './dist/packages/core',
    platform: 'node'
  },
  client: {
    entry: './sources/client/index.ts',
    outDir: './dist/client_packages',
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
    target: 'node14',
    format: 'cjs'
  })
  .then(() => {
    console.log(`${target} успешно собран в ${outDir}/index.js`);

    const distDir = resolve('./dist');
    const envSource = resolve('./.env.example');
    const envDest = resolve(distDir, '.env');
    const confSource = resolve('./sources/conf.json');
    const confDest = resolve(distDir, 'conf.json');

    if (!existsSync(distDir)) {
      mkdirSync(distDir, { recursive: true });
    }

    copyFileSync(envSource, envDest);
    console.log(`Copied .env.example to ${envDest}`);

    copyFileSync(confSource, confDest);
    console.log(`Copied sources/conf.json to ${confDest}`);
  })
  .catch((error) => {
    console.error(`Ошибка сборки ${target}:`, error);
    process.exit(1);
  });
