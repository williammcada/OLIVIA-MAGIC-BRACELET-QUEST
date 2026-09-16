import {readFile,mkdir,cp,access} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
const {version}=JSON.parse(await readFile('package.json','utf8'));
const root=process.cwd(),out=path.join(root,'release'),stage=path.join(out,'source-v'+version);
await access('dist/index.html');await access('release/Olivia_Quest_v'+version+'_Offline.html');
const metadata=JSON.parse(await readFile('dist/version.json','utf8'));
if(metadata.version!==version)throw Error('Rebuild the production site before packaging.');
await mkdir(path.join(stage,'SOURCE'),{recursive:true});
for(const item of ['src','public','scripts','tests','e2e','package.json','package-lock.json','tsconfig.json','vite.config.ts','vitest.config.ts','playwright.config.ts','index.html'])await cp(item,path.join(stage,'SOURCE',item),{recursive:true});
await cp('art-source',path.join(stage,'SOURCE','art-source'),{recursive:true});
await cp('RELEASE_v'+version+'.md',path.join(stage,'SOURCE','RELEASE_v'+version+'.md'));
await cp('RELEASE_v'+version+'.md',path.join(stage,'RELEASE_v'+version+'.md'));
const designSource='../OLIVIAS_MAGIC_BRACELET_QUEST_TECHNICAL_SPECIFICATION_v0.1.md';
try{
 await access(designSource);await mkdir(path.join(stage,'DESIGN'),{recursive:true});
 await cp(designSource,path.join(stage,'DESIGN','Technical_Specification_v0.1.md'));
 await cp('../Olivia_Magic_Bracelet_Quest_Visual_Bible_v0.1.md',path.join(stage,'DESIGN','Visual_Bible_v0.1.md'));
 await cp('../generated_images/exec-833e0917-6ae3-4f15-9fdd-183c00aa1d09.png',path.join(stage,'DESIGN','Approved_Cover.png'));
}catch{console.log('Historical design records not present; packaging editable source only.');}
const zip=(cwd,name)=>execFileSync('zip',['-rqFS',path.join(out,name),'.'],{cwd});
zip(path.join(root,'dist'),'Olivia_Quest_v'+version+'_Netlify.zip');
zip(stage,'Olivia_Quest_v'+version+'_Source.zip');
console.log('Packaged version '+version+'. Netlify ZIP has index.html at its root.');
