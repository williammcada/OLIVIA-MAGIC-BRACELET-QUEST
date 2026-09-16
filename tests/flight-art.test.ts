import {describe,it,expect} from 'vitest';
import sharp from 'sharp';
import {flightTextures,flightTextureAt,flightCycleMs} from '../src/flight-art';

describe('approved raster flight animation',()=>{
 it('ships every referenced frame with a transparent margin and solid character artwork',async()=>{
  const hashes=new Set<string>();
  for(const texture of flightTextures){
   const path=`public/art/${texture.file}`;
   const {data,info}=await sharp(path).ensureAlpha().raw().toBuffer({resolveWithObject:true});
   expect([info.width,info.height,info.channels]).toEqual([128,128,4]);
   let opaque=0,clear=0;
   for(let y=0;y<128;y++)for(let x=0;x<128;x++){
    const alpha=data[(y*128+x)*4+3];
    if(alpha===255)opaque++;if(alpha===0)clear++;
    if(x===0||x===127||y===0||y===127)expect(alpha).toBe(0);
   }
   expect(opaque).toBeGreaterThan(3500);expect(clear).toBeGreaterThan(8000);
   hashes.add(data.toString('base64'));
  }
  expect(hashes.size).toBe(6);
 });
 it('uses only loaded poses through a full loop and holds a glide in reduced motion',()=>{
  const loaded=new Set(flightTextures.map(t=>t.key)),seen=new Set<string>();
  for(let ms=0;ms<flightCycleMs;ms++){
   const key=flightTextureAt(ms);expect(loaded.has(key)).toBe(true);seen.add(key);
   expect(flightTextureAt(ms+flightCycleMs)).toBe(key);
   expect(flightTextureAt(ms,true)).toBe('fly2');
  }
  expect(seen.size).toBe(6);
  expect(flightTextureAt(flightCycleMs-1)).toBe('fly1');
  expect(flightTextureAt(flightCycleMs)).toBe('fly0');
 });
});
