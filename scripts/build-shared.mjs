import {build} from 'esbuild';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const output=process.argv[2]||'dist-shared/shared-math.js';
await build({entryPoints:['src/shared-math/standalone.ts'],bundle:true,format:'iife',globalName:'SharedMath',target:'es2020',outfile:output});
const sha=createHash('sha256').update(await readFile(output)).digest('hex');
await writeFile(output+'.sha256',sha+'  shared-math.js\n');
console.log(sha);
