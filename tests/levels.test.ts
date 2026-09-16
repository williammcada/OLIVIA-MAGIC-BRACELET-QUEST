import {describe,it,expect} from 'vitest';
import {levels,MOTION,onSolidGround,moonTarget} from '../src/levels';
import {beadDesigns} from '../src/beads';
describe('distinct stage layouts and basic route safety',()=>{
 it('has six distinct themes, a unicorn flight, and two longer advanced routes',()=>{expect(new Set(levels.map(l=>l.theme)).size).toBe(6);expect(levels).toHaveLength(6);expect(levels[4].width).toBeGreaterThanOrEqual(Math.ceil(levels[1].width*1.25));expect(levels[5].width).toBeGreaterThanOrEqual(Math.ceil(levels[1].width*1.25));expect(levels[4].ledges.filter(p=>p.fall).length).toBeGreaterThanOrEqual(3);expect(levels[5].ledges.filter(p=>p.fall).length).toBeGreaterThanOrEqual(3);expect(levels.filter(l=>l.ride)).toHaveLength(1);expect(MOTION.ride).toBeGreaterThan(MOTION.walk);expect(levels[1].ledges.filter(p=>p.move).length).toBeGreaterThan(2);expect(levels[2].beads.filter(b=>b.hidden).length).toBeGreaterThan(levels[0].beads.filter(b=>b.hidden).length);});
 for(const [q,l] of levels.entries()){
  it('stage '+(q+1)+' gaps fit a held ordinary jump and checkpoints stand on land',()=>{
   const range=(l.ride?MOTION.ride:MOTION.walk)*2*(l.ride?MOTION.rideJump:MOTION.jump)/MOTION.gravity;
   for(const [a,b] of l.gaps){expect(b-a+18).toBeLessThan(range);expect(onSolidGround(l,(a+b)/2)).toBe(false);}
   for(const x of [...l.checkpoints,...l.wells,l.gate,l.rescue]){expect(onSolidGround(l,x-16)).toBe(true);expect(onSolidGround(l,x+16)).toBe(true);}
   expect(new Set(l.beads.map(b=>b.id)).size).toBe(l.beads.length);
   expect(l.beads.every(b=>b.x>0&&b.x<l.width&&b.y>20&&b.y<190&&beadDesigns[b.color])).toBe(true);
  });
 }
 it('moon guidance finds remaining secret beads and reports completion',()=>{const l=levels[2],first=l.beads.find(b=>b.hidden)!;expect(moonTarget(l,[],first.x)?.id).toBe(first.id);expect(moonTarget(l,[first.id],first.x)?.id).not.toBe(first.id);expect(moonTarget(l,l.beads.filter(b=>b.hidden).map(b=>b.id),500)).toBeUndefined();});
});
