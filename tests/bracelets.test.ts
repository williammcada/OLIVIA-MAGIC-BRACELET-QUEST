import {describe,it,expect} from 'vitest';
import {beadDesigns,beadSvg} from '../src/beads';
import {vectorAssets} from '../src/vector-assets';
import {SaveService,SessionService,MasteryService,validateSave} from '../src/core';
import {levels} from '../src/levels';
import {skyBeat,musicStepMs} from '../src/music';
describe('automatic threading and bead identity',()=>{
 it('finishes a partial design in collection order and never duplicates or invents beads',()=>{
  const s=new SaveService(),session=new SessionService(s,new MasteryService(s));session.start(3);
  for(const b of levels[3].beads)session.collect(b.id);session.rescue();const r=s.data.active!;r.design=[6,1,19];
  session.autoThread();expect(r.design.slice(0,3)).toEqual([6,1,19]);expect(new Set(r.design).size).toBe(28);expect(r.design).toHaveLength(28);
  const order=[...r.design];session.autoThread();expect(r.design).toEqual(order);r.design.pop();session.autoThread();expect(r.design).toEqual(order);
  session.finishBracelet('Sky flowers');expect(s.data.bracelets[0].beads).toEqual(order.map(i=>r.beads[i]));expect(validateSave(s.data)).toBe(true);
  const imported=new SaveService();imported.import(JSON.stringify(s.data));expect(imported.data.bracelets).toEqual(s.data.bracelets);
 });
 it('does nothing with an empty collection or outside the studio',()=>{
  const s=new SaveService(),session=new SessionService(s,new MasteryService(s));session.autoThread();session.start(0);session.collect(levels[0].beads[0].id);session.autoThread();expect(s.data.active!.design).toEqual([]);
  session.start(1);session.rescue();session.autoThread();expect(s.data.active!.beads).toEqual([]);expect(()=>session.finishBracelet('Empty')).toThrow();
 });
 it('preserves legacy bead IDs and offers pattern variety in every adventure',()=>{
  expect(beadDesigns.slice(0,12).every(b=>b.pattern==='plain')).toBe(true);expect(beadDesigns[0].color).toBe('#f27fa6');expect(beadDesigns[7].name).toBe('Lagoon');
  expect(beadDesigns).toHaveLength(36);expect(new Set(beadDesigns.map(b=>b.pattern)).size).toBe(9);
  for(const l of levels)expect(new Set(l.beads.map(b=>beadDesigns[b.color].pattern)).size).toBeGreaterThanOrEqual(5);
 });
 it('embeds all bead designs in the format the Phaser loader decodes',()=>{
  const assets=vectorAssets();expect(new Set(assets.map(a=>a.key)).size).toBe(36);
  for(const a of assets){expect(a.url).toMatch(/^data:image\/svg\+xml;base64,/);const svg=atob(a.url.split(',')[1]);expect(svg).toBe(beadSvg(Number(a.key.slice(4))));expect(svg).not.toMatch(/(?:href|src)=["']https?:/);}
 });
 it('uses a longer, faster flight score with lead, bass and percussion',()=>{
  expect(musicStepMs(3)).toBeLessThan(musicStepMs(0));
  const score=Array.from({length:256},(_,i)=>skyBeat(i));expect(score.filter(b=>b.kick)).toHaveLength(32);expect(score.filter(b=>b.snare)).toHaveLength(32);
  expect(score.slice(0,128)).not.toEqual(score.slice(128));
  expect(score.flatMap(b=>b.notes).every(n=>n.frequency>30&&n.frequency<2000&&n.volume>0&&n.duration>0)).toBe(true);
 });
});
