import sharp from 'sharp';
import {mkdir,copyFile} from 'node:fs/promises';
await mkdir('public/art',{recursive:true});
const sheet=process.argv[2],cover=process.argv[3];
if(!sheet||!cover)throw Error('Supply approved sprite sheet and cover paths');
const keyed=await sharp(sheet).ensureAlpha().raw().toBuffer({resolveWithObject:true});
// Chroma-key export preparation; original artwork is retained unchanged.
for(let i=0;i<keyed.data.length;i+=4){const r=keyed.data[i],g=keyed.data[i+1],b=keyed.data[i+2];if(g>150&&g>r*1.8&&g>b*1.8)keyed.data[i+3]=0;}
const normalized=await sharp(keyed.data,{raw:{width:keyed.info.width,height:keyed.info.height,channels:4}}).png().toBuffer();
const meta=await sharp(normalized).metadata();
for(let row=0;row<4;row++)for(let col=0;col<4;col++){
 const left=Math.round(meta.width*col/4),top=Math.round(meta.height*row/4);
 const width=Math.round(meta.width*(col+1)/4)-left,height=Math.round(meta.height*(row+1)/4)-top;
 const cell=await sharp(normalized).extract({left,top,width,height}).png().toBuffer();
 await sharp(cell).trim({threshold:10}).resize(64,64,{fit:'contain',background:{r:0,g:0,b:0,alpha:0},kernel:'nearest'}).png().toFile(`public/art/sprite-${row*4+col}.png`);
}
await sharp(cover).resize(768,1152).webp({quality:84}).toFile('public/art/cover.webp');
await sharp(cover).extract({left:0,top:0,width:1024,height:420}).resize(780).webp({quality:88}).toFile('public/art/logo.webp');
for(const size of [192,512])await sharp('public/art/sprite-5.png').resize(size,size,{kernel:'nearest'}).flatten({background:'#59457f'}).png().toFile(`public/icon-${size}.png`);
await mkdir('art-source',{recursive:true});
await copyFile(sheet,'art-source/atlas-original.png');
console.log('Prepared sprites, approved cover, logo, and app icons.');
