import {describe,it,expect,vi} from 'vitest';
import {FLIGHT,flightState,advanceFlight,skyObstacles,touchesObstacle,bumpFlight,passesBead} from '../src/flight';
import {SaveService,SessionService,MasteryService,validateSave} from '../src/core';
import {levels} from '../src/levels';
import {FlightRun} from '../src/flight-world';
vi.mock('phaser',()=>({default:{Display:{Color:{HexStringToColor:()=>({color:0xffccaa})}}}}));

function fixture(){
 const save=new SaveService(),session=new SessionService(save,new MasteryService(save));session.start(3);
 const object=(x=0,y=0):any=>{
  const target:any={x,y,active:true,destroy(){this.active=false;},setPosition(x:number,y:number){this.x=x;this.y=y;return proxy;}};
  const proxy:any=new Proxy(target,{get(t,k){return k in t?t[k]:()=>proxy;}});
  target.body={setAllowGravity(){return this;},reset(x:number,y:number){target.x=x;target.y=y;}};return proxy;
 };
 const scene:any={add:new Proxy({},{get:()=>object}),physics:{add:{sprite:object},world:object()},cameras:{main:object()},input:{},events:object()};
 const hooks:any={save,session,audio:{tone:vi.fn(),good:vi.fn()},gate:vi.fn(),refill:vi.fn(),rescue:vi.fn(()=>session.rescue()),pause:vi.fn(),hud:vi.fn()};
 const input={up:false,down:false,jump:false,power:false,interact:false};
 const controller=new FlightRun(scene,hooks,levels[3],input);controller.create();
 return {save,session,scene,hooks,input,controller};
}
describe('unicorn flight controls and course',()=>{
 it('flies faster than walking, climbs and dives smoothly, and levels out when released',()=>{
  const s=flightState();for(let i=0;i<120;i++)advanceFlight(s,{up:false,down:false,boost:false},16.67);
  expect(s.x).toBeGreaterThan(300);expect(s.speed).toBeGreaterThan(180);
  for(let i=0;i<20;i++)advanceFlight(s,{up:true,down:false,boost:false},16.67);
  const high=s.y;expect(high).toBeLessThan(FLIGHT.startY);
  for(let i=0;i<60;i++)advanceFlight(s,{up:false,down:false,boost:false},16.67);expect(s.vy).toBe(0);
  for(let i=0;i<60;i++)advanceFlight(s,{up:false,down:true,boost:false},16.67);
  expect(s.y).toBe(FLIGHT.maxY);expect(s.y).toBeGreaterThan(high);
  for(let i=0;i<100;i++)advanceFlight(s,{up:true,down:false,boost:false},16.67);expect(s.y).toBe(FLIGHT.minY);
 });
 it('dash has a cooldown, cannot retrigger while held, and needs no math or energy',()=>{
  const s=flightState({x:3000,y:120});advanceFlight(s,{up:false,down:false,boost:true},20);
  const first=s.boostUntil;for(let i=0;i<400;i++)advanceFlight(s,{up:false,down:false,boost:true},20);
  expect(s.boostUntil).toBe(first);advanceFlight(s,{up:false,down:false,boost:false},20);advanceFlight(s,{up:false,down:false,boost:true},20);
  expect(s.boostUntil).toBeGreaterThan(first);expect(s.boostReadyAt).toBeGreaterThan(s.elapsed);
 });
 it('bumps slow flight briefly and cannot chain repeatedly on the same obstacle',()=>{
  const s=flightState({x:2000,y:120});s.elapsed=100;s.speed=FLIGHT.cruise;
  expect(bumpFlight(s)).toBe(true);expect(bumpFlight(s)).toBe(false);
  for(let i=0;i<20;i++)advanceFlight(s,{up:false,down:false,boost:false},20);expect(s.speed).toBeLessThan(FLIGHT.cruise);
  for(let i=0;i<110;i++)advanceFlight(s,{up:false,down:false,boost:false},20);expect(s.speed).toBe(FLIGHT.cruise);
 });
 it('provides a collectable, collision-free route through every wave, including during dashes',()=>{
  for(const delta of [16.67,33.33,50]){
   const s=flightState(),seen=new Set<number>();let collisions=0;
   while(s.x<FLIGHT.finish){
    const target=levels[3].beads.find(b=>b.x>s.x-20&&!seen.has(b.id)),goal=target?.y??145;
    const before={x:s.x,y:s.y};advanceFlight(s,{up:s.y>goal+5,down:s.y<goal-5,boost:Math.floor(s.elapsed/1000)%6===2},delta);
    for(const b of levels[3].beads)if(passesBead(before,s,b))seen.add(b.id);
    for(const o of skyObstacles)if(touchesObstacle(s,o))collisions++;
    expect(s.elapsed).toBeLessThan(90000);
   }
   expect(seen.size).toBe(28);expect(collisions).toBe(0);
  }
 });
 it('has its only gate before the first obstacle and no wells or ground platforming',()=>{
  const l=levels[3];expect(l.gate).toBeLessThan(l.beads[0].x);expect(l.gate).toBeLessThan(skyObstacles[0].x);
  expect(l.wells).toEqual([]);expect(l.gaps).toEqual([]);expect(l.ledges).toEqual([]);
  expect(new Set(skyObstacles.map(o=>o.kind)).size).toBe(3);expect(l.beads.every(b=>!b.hidden)).toBe(true);
 });
});
describe('flight entry, completion and progress',()=>{
 it('requires the opening gate, then completes the entire flight without another math stop',()=>{
  const {controller:c,input,hooks,save}=fixture();
  c.update(16);expect(c.state.x).toBe(FLIGHT.startX);input.interact=true;c.update(16);expect(hooks.gate).toHaveBeenCalledTimes(1);expect(c.flying).toBe(false);
  input.interact=false;c.update(16);save.data.active!.gateOpen=true;save.data.active!.gateDone=2;input.interact=true;c.update(16);input.interact=false;
  while(!c.done){const next=levels[3].beads.find(b=>b.x>c.state.x-20&&!save.data.active!.collected.includes(b.id)),goal=next?.y??145;input.up=c.state.y>goal+5;input.down=c.state.y<goal-5;c.update(33.33);expect(c.state.elapsed).toBeLessThan(90000);}
  expect(hooks.gate).toHaveBeenCalledTimes(1);expect(hooks.refill).not.toHaveBeenCalled();expect(hooks.rescue).toHaveBeenCalledTimes(1);
  expect(save.data.active!.beads).toEqual(levels[3].beads.map(b=>b.color));expect(save.data.active!.phase).toBe('studio');expect(validateSave(save.data)).toBe(true);
  c.update(16);expect(hooks.rescue).toHaveBeenCalledTimes(1);
 });
 it('resumes a saved mid-flight position, retains old beads, and does not require another gate',()=>{
  const f=fixture(),r=f.save.data.active!;r.gateOpen=true;r.flight={x:6000,y:96};r.beads=[0,7,12];r.collected=[1300,1301,1302];
  const restored=new SaveService();restored.import(JSON.stringify(f.save.data));
  const resumed=new FlightRun(f.scene,{...f.hooks,save:restored},levels[3],f.input);resumed.create();
  expect(resumed.flying).toBe(true);expect(resumed.state.x).toBe(6000);expect(resumed.state.y).toBe(96);resumed.update(20);
  expect(restored.data.active!.beads).toEqual([0,7,12]);expect(f.hooks.gate).not.toHaveBeenCalled();expect(validateSave(restored.data)).toBe(true);
 });
 it('brings an old unfinished ride to the new launch pad and keeps its inventory and earned gate',()=>{
  const f=fixture(),r=f.save.data.active!;r.levelRevision=2;r.checkpoint=5;r.beads=[0,1,2];r.gateOpen=true;
  const converted=new FlightRun(f.scene,f.hooks,levels[3],f.input);converted.create();
  expect(converted.flying).toBe(false);expect(converted.state.x).toBe(FLIGHT.startX);expect(r.beads).toEqual([0,1,2]);expect(r.gateOpen).toBe(true);expect(validateSave(f.save.data)).toBe(true);
 });
});
