import { copyFile, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const srcDir = 'src';
const destDir = 'dist';

await mkdir(destDir, { recursive: true });

const entries = await readdir(srcDir);
const cssFiles = entries.filter((f) => f.endsWith('.css'));

for (const file of cssFiles) {
    await copyFile(join(srcDir, file), join(destDir, file));
}

if (cssFiles.length > 0) {
    console.log(`✔ ${cssFiles.length} css file${cssFiles.length === 1 ? '' : 's'} copied`);
}
