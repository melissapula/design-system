import StyleDictionary from 'style-dictionary';
import { watch } from 'node:fs';
import { mkdir, readdir, copyFile } from 'node:fs/promises';
import { join } from 'node:path';

const watchMode = process.argv.includes('--watch');

const config = {
    source: ['src/**/*.json'],
    usesDtcg: true,
    platforms: {
        css: {
            transformGroup: 'css',
            buildPath: 'build/css/',
            files: [
                {
                    destination: 'tokens.css',
                    format: 'css/variables',
                    options: { outputReferences: true },
                },
            ],
        },
        js: {
            transformGroup: 'js',
            buildPath: 'build/js/',
            files: [
                {
                    destination: 'tokens.js',
                    format: 'javascript/esm',
                },
            ],
        },
        ts: {
            transformGroup: 'js',
            buildPath: 'build/ts/',
            files: [
                {
                    destination: 'tokens.d.ts',
                    format: 'typescript/module-declarations',
                },
            ],
        },
        json: {
            transformGroup: 'js',
            buildPath: 'build/json/',
            files: [
                {
                    destination: 'tokens.json',
                    format: 'json/nested',
                },
            ],
        },
    },
};

async function copyThemes() {
    const srcDir = 'src/themes';
    const destDir = 'build/themes';
    let entries;
    try {
        entries = await readdir(srcDir);
    } catch {
        // No themes directory — that's fine
        return;
    }
    await mkdir(destDir, { recursive: true });
    const cssFiles = entries.filter((f) => f.endsWith('.css'));
    for (const file of cssFiles) {
        await copyFile(join(srcDir, file), join(destDir, file));
    }
    if (cssFiles.length > 0) {
        console.log(`✔ ${cssFiles.length} theme${cssFiles.length === 1 ? '' : 's'} copied`);
    }
}

async function build() {
    const sd = new StyleDictionary(config);
    await sd.cleanAllPlatforms();
    await sd.buildAllPlatforms();
    await copyThemes();
    console.log('✔ tokens built');
}

await build();

if (watchMode) {
    console.log('watching src/ for changes');
    let timer;
    watch('src', { recursive: true }, () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            build().catch((err) => console.error(err));
        }, 50);
    });
}
