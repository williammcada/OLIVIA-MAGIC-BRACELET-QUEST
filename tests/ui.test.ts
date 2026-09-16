// @vitest-environment happy-dom
import {test,expect,vi} from 'vitest';
import {levels} from '../src/levels';
import {VERSION} from '../src/version';
import {buildScaffold,generate} from '../src/core';
const runtime=vi.hoisted(()=>({hooks:null as any,active:new Set<string>(),paused:new Set<string>()}));
vi.mock('../src/audio',()=>({AudioService:class {music=0;sfx=0;readAloud=false;unlock(){}speak(){}stopVoice(){}tone(){}good(){}}}));
vi.mock('../src/world',()=>({asset:(n:string)=>`./art/${n}`,controls:{left:false,right:false,jump:false,interact:false,power:false,moon:false},clearControls:()=>{},setHooks:(h:any)=>runtime.hooks=h,BootScene:class{},PreloadScene:class{},PlatformScene:class{},screenNames:['TitleScene','WorldMapScene','MathStationScene','MathOverlayScene','BraceletStudioScene','QuestResultScene','ParentDashboardScene'],screenScene:(s:string)=>class {name=s}}));
vi.mock('phaser',()=>({default:{AUTO:0,Scale:{FIT:0,CENTER_BOTH:0},Game:class {
 scene={getScenes:()=>[...runtime.active].map(key=>({scene:{key}})),start:(key:string)=>{runtime.active.add(key);if(key==='PlatformScene')runtime.hooks.hud('');else runtime.hooks.screen(key);},stop:(key:string)=>runtime.active.delete(key),pause:(key:string)=>{runtime.active.delete(key);runtime.paused.add(key);},resume:(key:string)=>{runtime.active.add(key);runtime.paused.delete(key);},isActive:(key:string)=>runtime.active.has(key),getScene:()=>({context:'',player:{x:42,y:174}})};
 constructor(){setTimeout(()=>runtime.hooks.ready(),0);}
}}}));
function click(id:string){const b=document.getElementById(id) as HTMLButtonElement|null;expect(b,`#${id} exists`).toBeTruthy();expect(b!.disabled,`#${id} enabled`).not.toBe(true);b!.click();}
function answer(n:number){for(const d of String(n)){const b=document.querySelector<HTMLButtonElement>(`[data-digit="${d}"]`);expect(b).toBeTruthy();b!.click();}click('confirm');}
const debug=()=> (window as any).__QUEST_DEBUG__;
const state=()=>JSON.parse(localStorage.getItem('olivia-quest-v1')!);
test('UI components: practice → scaffold → gate → rescue → bracelet → parent diagnostic (renderer mocked)',async()=>{
 document.body.innerHTML='<main id="app"><div id="game"></div><section id="ui"></section><div id="touch"></div></main>';
 localStorage.clear();vi.spyOn(Math,'random').mockReturnValue(.5);await import('../src/main');await vi.waitFor(()=>expect(document.getElementById('play')).toBeTruthy());
 click('play');click('go');expect(debug().active.phase).toBe('practice');const first=debug().problem;
 answer(9);expect(document.body.textContent).toContain('Let’s build it together.');answer(first.answer);answer(first.answer);expect(document.body.textContent).toContain('You built it!');expect(state().attempts[0].hint).toBe(true);expect(state().active.energy).toBe(2);click('next');
 for(let i=0;i<4;i++){answer(debug().problem.answer);click('next');}
 expect(state().attempts).toHaveLength(5);expect(state().active.energy).toBe(6);click('adventure');expect(runtime.active.has('PlatformScene')).toBe(true);
 runtime.hooks.gate();expect(runtime.paused.has('PlatformScene')).toBe(true);for(let i=0;i<2;i++){answer(debug().problem.answer);click('next');}expect(state().active.gateOpen).toBe(true);expect(runtime.active.has('PlatformScene')).toBe(true);
 runtime.hooks.session.collect(levels[0].beads[0].id);runtime.hooks.session.collect(levels[0].beads[0].id);expect(state().active.beads).toHaveLength(1);for(const b of levels[0].beads.slice(1,5))runtime.hooks.session.collect(b.id);runtime.hooks.rescue();expect(document.body.textContent).toContain('A little magic, made by you');
 document.querySelector<HTMLButtonElement>('[data-bead="3"]')!.click();document.querySelector<HTMLButtonElement>('[data-index="0"]')!.click();click('auto-thread');
 expect(state().active.design).toEqual([3,0,1,2,4]);expect((document.getElementById('auto-thread') as HTMLButtonElement).disabled).toBe(true);
 expect(state().active.design).toHaveLength(5);click('finish');expect(state().bracelets).toHaveLength(1);expect(state().completed).toEqual([0]);click('home');click('gallery');expect(document.body.textContent).toContain('Meadow Sparkle');click('home');
 document.getElementById('parent')!.click();(document.getElementById('adult-answer') as HTMLInputElement).value='36';click('adult-enter');expect(document.body.textContent).toContain('Recent skill evidence');
 const selector=document.getElementById('manualSkill') as HTMLSelectElement;selector.value='N1';selector.dispatchEvent(new Event('change'));click('diagnostic');expect(debug().problem.skillId).toBe('N1');
 const count=document.querySelectorAll('.count-bead').length;document.querySelectorAll<HTMLButtonElement>('.count-bead').forEach(b=>b.click());expect(document.querySelectorAll('.slot .count-bead').length).toBe(count);
 answer(debug().problem.answer);click('next');expect(document.body.textContent).toContain('Recent skill evidence');expect(state().attempts).toHaveLength(8);expect(state().bracelets).toHaveLength(1);
 for(const id of ['A6','S5']){
  const selector=document.getElementById('manualSkill') as HTMLSelectElement;selector.value=id;selector.dispatchEvent(new Event('change'));click('diagnostic');const p=debug().problem;
  if(id==='S5')expect(document.body.textContent).toContain('−');
  click('hint');for(const step of buildScaffold(p)){answer(step.answer);}
  expect(document.body.textContent).toContain(p.kind==='subtract'?p.a+' − '+p.b+' = '+p.answer:p.a+' + '+p.b+' = '+p.answer);click('next');
 }
 expect(state().attempts).toHaveLength(10);
 expect(document.querySelector('[data-coverage="A7"] summary')!.textContent).toContain('/ 231 practiced');
 expect(document.querySelector('[data-coverage="S6"] summary')!.textContent).toContain('1 / 231 practiced');
 expect(document.querySelectorAll('[data-coverage="S6"] .fact:not(.outside)')).toHaveLength(231);
 expect(document.querySelector('.version-badge')!.textContent).toBe('v'+VERSION);
 const focus=(id:string)=>{const selector=document.getElementById('manualSkill') as HTMLSelectElement;selector.value=id;selector.dispatchEvent(new Event('change'));};
 focus('A7');const automatic=document.getElementById('auto') as HTMLInputElement;automatic.checked=false;automatic.dispatchEvent(new Event('change'));
 expect(document.getElementById('current-focus')!.textContent).toContain('A7');
 click('home');click('play');click('go');expect(debug().problem.skillId).toBe('A7');
 answer(debug().problem.answer);click('next');click('save-home');
 // Change focus midway through an unfinished quest, then continue that same run.
 const runId=state().active.id;
 document.getElementById('parent')!.click();(document.getElementById('adult-answer') as HTMLInputElement).value='36';click('adult-enter');
 expect(document.querySelector('[data-coverage="A7"] summary')!.textContent).toContain('/ 231 practiced');
 focus('S6');click('home');click('play');
 expect(state().active.id).toBe(runId);expect(debug().problem.skillId).toBe('S6');
 answer(debug().problem.answer);expect(state().active.skill).toBe('S6');expect(state().bracelets).toHaveLength(1);
 click('next');click('save-home');runtime.hooks.session.start(3);click('play');click('go');
 for(let i=0;i<5;i++){answer(debug().problem.answer);click('next');}
 expect(document.body.textContent).toContain('Math comes before takeoff');click('adventure');
 expect(document.querySelector('[data-control="up"]')).toBeTruthy();expect(document.querySelector('[data-control="down"]')).toBeTruthy();expect(document.querySelector('[data-control="moon"]')).toBeNull();
 runtime.hooks.hud('Open sky gate',{moonSeconds:0,moonHint:'',message:'',ride:true,flight:{progress:0,boostReady:true,flying:false}});
 expect(document.body.textContent).toContain('Ready at the sky gate');runtime.hooks.gate();expect(document.body.textContent).toContain('Sky gate · before takeoff');
 for(let i=0;i<2;i++){answer(debug().problem.answer);click('next');}
 expect(state().active.gateOpen).toBe(true);expect(runtime.active.has('PlatformScene')).toBe(true);
 click('pause');click('controls');expect(document.body.textContent).toContain('Lumi moves forward');expect(document.body.textContent).toContain('Star Dash');click('return');

},20000);
