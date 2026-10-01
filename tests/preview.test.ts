// @vitest-environment happy-dom
import {test,expect,vi} from 'vitest';
import {catalog} from '../src/shared-math/catalog';
import {Practice,freshMath} from '../src/shared-math/engine';
import {settingsHTML,wireSettings} from '../src/shared-math/settings';
import {searchSkills,previewSkills,openPreview} from '../src/shared-math/preview';
import {quarterTimeItem} from '../src/shared-math/quarter-time';
const click=(id:string)=>document.getElementById(id)!.click();
const input=(id:string,value:string,event='input')=>{const el=document.getElementById(id) as HTMLInputElement;el.value=value;el.dispatchEvent(new Event(event));};
function setup(){const state=freshMath();state.config.selected=[];const p=new Practice(state);document.body.innerHTML=settingsHTML(p);wireSettings(p,()=>{},()=>{});return p;}
test('old Grade3 subtraction remains explicit; removing it restricts new gates to four Grade1 skills',()=>{
 const state=freshMath();state.config={...state.config,mode:'targeted',lo:3,hi:3,selected:['g3-submissing']};const p=new Practice(state);p.open('practice','old-run');const pending=structuredClone(state.gate);
 document.body.innerHTML=settingsHTML(p);wireSettings(p,()=>{},()=>{});expect(document.getElementById('grade3-preset')).toBeNull();input('skill-search','subtract');
 const four=searchSkills('subtract',3,3).filter(s=>s.grade===1);expect(four).toHaveLength(4);for(const skill of four)document.querySelector<HTMLInputElement>(`#skills input[value="${skill.id}"]`)!.click();
 expect(document.getElementById('selected-heading')!.textContent).toContain('(5)');expect(document.getElementById('selected-list')!.textContent).toContain('Missing subtraction values');document.querySelector<HTMLButtonElement>('[data-unselect="g3-submissing"]')!.click();click('save-settings');expect(document.getElementById('notice')!.textContent).toContain('4 skills');expect(state.gate).toEqual(pending);
 p.open('practice','new-run');for(let i=0;i<50;i++){expect(four.map(s=>s.id)).toContain(state.gate!.item.skillId);p.next();}
 click('clear-selection');expect(document.querySelectorAll('[data-unselect]')).toHaveLength(0);expect(state.config.selected).toHaveLength(4);
});
test('search crosses grade filters, matches standard/name/id, is grade ordered, preserves hidden checks',()=>{
 const p=setup();input('skill-search','TIME');const results=searchSkills('TIME',2,2);expect(results.some(s=>s.grade===1)).toBe(true);expect(results.some(s=>s.grade===4)).toBe(true);expect(results.map(s=>s.grade)).toEqual(results.map(s=>s.grade).sort());expect(searchSkills('3.MD.A.1',0,0).some(s=>s.id==='g3-time-quarter')).toBe(true);
 const el=document.querySelector<HTMLInputElement>('#skills input[value="g4-timeback"]')!;el.click();expect((document.getElementById('hi') as HTMLInputElement).value).toBe('4');input('skill-search','addition');input('skill-search','time');expect(document.querySelector<HTMLInputElement>('#skills input[value="g4-timeback"]')!.checked).toBe(true);expect(p.state.config.selected).toEqual([]);
});
test('ten checked skills yield ten previews in catalog order, not gate count; no state mutation',()=>{
 const p=setup();p.state.config.count=1;const skills=catalog.slice(0,10);input('skill-search','');input('lo','0','change');input('hi','7','change');for(const s of [...skills].reverse())document.querySelector<HTMLInputElement>(`#skills input[value="${s.id}"]`)!.click();
 const before=JSON.stringify(p.state);click('diagnostic');for(let i=0;i<10;i++){expect(document.getElementById('skill-preview')!.textContent).toContain(`Preview ${i+1} of 10`);expect(document.getElementById('preview-skill')!.textContent).toContain(skills[i].name);click('preview-next');}expect(document.getElementById('skill-preview')!.hidden).toBe(true);expect(JSON.stringify(p.state)).toBe(before);expect(document.querySelectorAll('#skills input:checked')).toHaveLength(10);
});
test('empty preview, closing draft and unfinished gate isolation',()=>{const p=setup();p.state.config.mode='general';p.open('gate','a');const before=JSON.stringify(p.state);click('diagnostic');expect(document.getElementById('notice')!.textContent).toContain('Check at least one');input('skill-search','g3-time-quarter');document.querySelector<HTMLInputElement>('#skills input')!.click();click('diagnostic');click('preview-close');expect((document.getElementById('skill-search') as HTMLInputElement).value).toBe('g3-time-quarter');expect(JSON.stringify(p.state)).toBe(before);});
test('preview answer types support keyboard and fraction formatting without recording evidence',()=>{
 vi.spyOn(Math,'random').mockReturnValue(.5);
 const skills=[...new Map(catalog.map(s=>[s.make().type,s])).values()];document.body.innerHTML='<button id="diagnostic"></button><div id="skill-preview"></div>';
 for(const skill of skills){openPreview(document.getElementById('skill-preview')!,[skill]);const expected=String(skill.make().answer),el=document.getElementById('preview-answer')!;for(const key of expected)el.dispatchEvent(new KeyboardEvent('keydown',{key,bubbles:true}));click('preview-submit');expect(document.getElementById('preview-feedback')!.textContent,skill.id).toBe('Correct.');click('preview-close');}vi.restoreAllMocks();
});
test('quarter-hour arithmetic is correct for all seven durations and both directions, including noon',()=>{
 const parse=(s:string)=>{const m=s.match(/(\d+):(\d+) (AM|PM)/)!;return Number(m[1])%12*60+Number(m[2])+(m[3]==='PM'?720:0);};
 for(let start=360;start<=1080;start+=15)for(const d of [15,30,45,60,75,90,105])for(const forward of [true,false]){const q=quarterTimeItem(start,d,forward),given=parse(q.prompt),result=parse(q.answer);expect(result).toBe(given+(forward?d:-d));expect(result%15).toBe(0);expect(result).toBeGreaterThanOrEqual(0);expect(result).toBeLessThan(1440);expect(q.prompt).toContain(forward?'after':'before');}
 expect(previewSkills(['g3-time-quarter','g1-time']).map(s=>s.id)).toEqual(['g1-time','g3-time-quarter']);
});
