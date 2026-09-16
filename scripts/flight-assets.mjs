import sharp from 'sharp';
import {mkdir} from 'node:fs/promises';

// Export preparation; the approved generated source artwork is kept intact.
const source='art-source/lumi-flight-sheet-v0.3.1.png';
const {data,info}=await sharp(source).ensureAlpha().raw().toBuffer({resolveWithObject:true});
if(info.width!==1536||info.height!==1024)throw Error('Expected a 3 × 2 sheet of 512px cells.');
// Separate only the connected exterior preview backing. Colored dark outlines
// stop the flood, so Lumi's enclosed white feathers and body remain opaque.
const visited=new Uint8Array(info.width*info.height),queue=new Int32Array(visited.length);
let head=0,tail=0;
const enqueue=p=>{
 if(p<0||p>=visited.length||visited[p])return;
 const i=p*4,r=data[i],g=data[i+1],b=data[i+2];
 if(Math.min(r,g,b)<95||Math.max(r,g,b)-Math.min(r,g,b)>27)return;
 visited[p]=1;queue[tail++]=p;
};
for(let x=0;x<info.width;x++){enqueue(x);enqueue((info.height-1)*info.width+x);}
for(let y=0;y<info.height;y++){enqueue(y*info.width);enqueue(y*info.width+info.width-1);}
while(head<tail){const p=queue[head++],x=p%info.width;data[p*4+3]=0;if(x)enqueue(p-1);if(x<info.width-1)enqueue(p+1);enqueue(p-info.width);enqueue(p+info.width);}
const sheet=await sharp(data,{raw:{width:info.width,height:info.height,channels:4}}).png().toBuffer();
// Register the collar star/saddle across the six generated cells.
const offsets=[[0,0],[10,0],[4,0],[-9,42],[12,42],[10,42]];
await mkdir('public/art',{recursive:true});
for(let i=0;i<6;i++){
 const [dx,dy]=offsets[i];
 const cell=await sharp(sheet).extract({left:i%3*512,top:Math.floor(i/3)*512,width:512,height:512}).png().toBuffer();
 const clipped=await sharp(cell).extract({left:Math.max(0,-dx),top:Math.max(0,-dy),width:512-Math.abs(dx),height:512-Math.abs(dy)}).png().toBuffer();
 const registered=await sharp({create:{width:512,height:512,channels:4,background:'#00000000'}}).composite([{input:clipped,left:Math.max(0,dx),top:Math.max(0,dy)}]).png().toBuffer();
 await sharp(registered).resize(128,128,{kernel:'nearest'}).png().toFile(`public/art/lumi-flight-${i}.png`);
}
console.log('Prepared six registered 128 × 128 pixel-art flight textures.');
