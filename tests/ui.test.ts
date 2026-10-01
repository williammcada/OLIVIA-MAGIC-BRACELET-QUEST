// @vitest-environment happy-dom
import {test,expect,vi} from 'vitest';
import {levels} from '../src/levels';
import {catalog} from '../src/shared-math/catalog';
import {VERSION} from '../src/version';
import {buildScaffold,generate} from '../src/core';
const runtime=vi.hoisted(()=>({hooks:null as any,active:new Set<string>(),paused:new Set<string>()}));
vi.mock('../src/audio',()=>({AudioService:class {music=0;sfx=0;readAloud=false;unlock(){}speak(){}stopVoice(){}tone(){}good(){}}}));
vi.mock('../src/world',()=>({asset:(n:string)=>`./art/${n}`,controls:{left:false,right:false,jump:false,interact:false,power:false,moon:false},clearControls:()=>{},setHooks:(h:any)=>runtime.hooks=h,BootScene:class{},PreloadScene:class{},PlatformScene:class{},screenNames:['TitleScene','WorldMapScene','MathStationScene','MathOverlayScene','BraceletStudioScene','QuestResultScene','ParentDashboardScene'],screenScene:(s:string)=>class {name=s}}));
vi.mock('phaser',()=>({default:{AUTO:0,Scale:{FIT:0,CENTER_BOTH:0},Game:class {
 scene={getScenes:()=>[...runtime.active].map(key=>({scene:{key}})),start:(key:string)=>{runtime.active.add(key);if(key==='PlatformScene')runtime.hooks.hud('');else runtime.hooks.screen(key);},stop:(key:string)=>{runtime.active.delete(key);runtime.paused.delete(key);},pause:(key:string)=>{runtime.active.delete(key);runtime.paused.add(key);},resume:(key:string)=>{runtime.active.add(key);runtime.paused.delete(key);},isActive:(key:string)=>runtime.active.has(key),isPaused:(key:string)=>runtime.paused.has(key),getScene:()=>({context:'',player:{x:42,y:174}})};
 constructor(){setTimeout(()=>runtime.hooks.ready(),0);}
}}}));
function click(id:string){const b=document.getElementById(id) as HTMLButtonElement|null;expect(b,`#${id} exists`).toBeTruthy();expect(b!.disabled,`#${id} enabled`).not.toBe(true);b!.click();}
function answer(n:string|number){window.dispatchEvent(new KeyboardEvent('keydown',{key:'Delete'}));for(const key of String(n))window.dispatchEvent(new KeyboardEvent('keydown',{key}));click('submit');}
const debug=()=> (window as any).__QUEST_DEBUG__;
const state=()=>JSON.parse(localStorage.getItem('olivia-quest-v1')!);
function unlock(){(document.getElementById('password') as HTMLInputElement).value='admin123';click('unlock');}
function setting(id:string,value:string){const el=document.getElementById(id) as HTMLSelectElement;el.value=value;el.dispatchEvent(new Event('change'));}
test('shared settings and gates integrate with adventure, rewards, pause and persistence (renderer mocked)',async()=>{
 document.body.innerHTML='<main id="app"><div id="game"></div><section id="ui"></section><div id="touch"></div></main>';
 localStorage.clear();vi.spyOn(Math,'random').mockReturnValue(.5);vi.spyOn(window,'confirm').mockReturnValue(true);await import('../src/main');await vi.waitFor(()=>expect(document.getElementById('play')).toBeTruthy());
 click('play');click('go');expect(debug().problem.skillId).toBe('S01');const first=debug().problem;
 answer(-999);expect(document.getElementById('feedback')!.textContent).toContain('Try again');expect(debug().problem).toEqual(first);expect(document.querySelector('.count-bead')).toBeNull();expect(document.getElementById('hint')).toBeNull();
 click('math-settings');unlock();expect(document.getElementById('mode')).toBeTruthy();expect(document.querySelector('#lo option')!.textContent).toBe('K');setting('count','1');click('save-settings');expect(state().mathPractice.config.count,document.getElementById('notice')!.textContent||'').toBe(1);expect(state().mathPractice.gate.config.count).toBe(5);click('close-settings');expect(debug().problem).toEqual(first);
 answer(first.answer);for(let i=0;i<4;i++)answer(debug().problem.answer);expect(state().mathPractice.history.S01).toEqual([false,true,true,true,true]);expect(document.getElementById('adventure')).toBeTruthy();click('adventure');expect(runtime.active.has('PlatformScene')).toBe(true);
 runtime.hooks.gate();expect(runtime.paused.has('PlatformScene')).toBe(true);expect(debug().math.gate.config.count).toBe(1);answer(debug().problem.answer);expect(state().active.gateOpen).toBe(true);expect(runtime.active.has('PlatformScene')).toBe(true);
 click('pause');click('settings');unlock();setting('lo','0');setting('hi','0');setting('mode','general');click('save-settings');click('close-settings');expect(runtime.active.has('PlatformScene')).toBe(true);
 runtime.hooks.refill();expect(debug().problem.skillId).toMatch(/^(k-|N|A|S)/);answer(debug().problem.answer);expect(runtime.active.has('PlatformScene')).toBe(true);
 for(const b of levels[0].beads.slice(0,5))runtime.hooks.session.collect(b.id);runtime.hooks.rescue();expect(document.body.textContent).toContain('A little magic, made by you');click('auto-thread');click('finish');expect(state().bracelets).toHaveLength(1);click('home');
 click('parent');unlock();expect(document.body.textContent).toContain('Archived Olivia evidence');setting('lo','3');setting('hi','3');setting('mode','targeted');const fraction=document.querySelector<HTMLInputElement>('#skills input[value="F01"]')!;fraction.checked=true;fraction.dispatchEvent(new Event('change'));click('save-settings');click('diagnostic');expect(document.getElementById('preview-skill')).toBeTruthy();expect(debug().problem).toBeNull();expect(document.querySelectorAll('.count-bead')).toHaveLength(0);click('preview-close');expect(document.getElementById('mode')).toBeTruthy();expect(state().bracelets).toHaveLength(1);
 // Invalid targeted selection does not replace the saved configuration.
 const old=state().mathPractice.config;setting('lo','7');setting('hi','7');click('save-settings');expect(document.getElementById('notice')!.textContent).toContain('Select at least one');expect(state().mathPractice.config).toEqual(old);
 expect(document.querySelector('.version-badge')!.textContent).toBe('v'+VERSION);
 // Clear-math cancellation preserves state; confirmed math-only reset preserves rewards.
 const before=JSON.stringify(state());vi.mocked(window.confirm).mockReturnValueOnce(false);click('math-reset');expect(JSON.stringify(state())).toBe(before);click('math-reset');expect(state().mathPractice.events).toHaveLength(0);expect(state().bracelets).toHaveLength(1);
},30000);
