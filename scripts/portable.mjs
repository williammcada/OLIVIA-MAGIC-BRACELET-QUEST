import {build} from 'esbuild';
import {readdir,readFile,writeFile,mkdir} from 'node:fs/promises';
const {version}=JSON.parse(await readFile('package.json','utf8'));
const result=await build({entryPoints:['src/main.ts'],bundle:true,write:false,format:'iife',target:'es2022',minify:true,loader:{'.css':'empty'},define:{'process.env.NODE_ENV':'"production"'}});
const assets={};
for(const f of await readdir('public/art')){if(!/\.(png|webp)$/.test(f))continue;assets[f]=`data:image/${f.endsWith('webp')?'webp':'png'};base64,${(await readFile(`public/art/${f}`)).toString('base64')}`;}
const css=await readFile('src/style.css','utf8');
const icon=(await readFile('public/icon-192.png')).toString('base64');
const html=`<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>Olivia’s Magic Bracelet Quest</title><link rel="icon" href="data:image/png;base64,${icon}"><style>${css}</style></head><body><main id="app"><div id="game" aria-label="Olivia’s platform adventure"></div><section id="ui" aria-live="polite"></section><div id="touch"></div></main><script>window.__OLIVIA_ASSETS__=${JSON.stringify(assets)};</script><script>${result.outputFiles[0].text.replace(/<\/script/gi,'<\\/script')}</script></body></html>`;
await mkdir('release',{recursive:true});await writeFile(`release/Olivia_Quest_v${version}_Offline.html`,html.replace('<title>Olivia’s Magic Bracelet Quest</title>',`<title>Olivia’s Magic Bracelet Quest · v${version}</title>`));
console.log(`Portable edition: ${(Buffer.byteLength(html)/1024/1024).toFixed(2)} MiB, all game art and code embedded.`);
