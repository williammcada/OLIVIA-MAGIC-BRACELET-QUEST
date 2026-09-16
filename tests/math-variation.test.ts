import {describe,it,expect} from 'vitest';
import {MathEngine,MasteryService,SaveService,generate,factCoverage,validateSave,skills,type Attempt,type Problem,type SkillId} from '../src/core';
import {factBank,evidenceKey} from '../src/facts';

function focused(){const s=new SaveService();s.data.settings.auto=false;s.data.settings.manualSkill='A7';return s;}
let ordinal=0;
function record(s:SaveService,p:Problem,correct=true){
 const a:Attempt={...p,id:`test-${++ordinal}`,sessionId:s.data.session.id,time:Date.now(),
  firstResponse:correct?p.answer:(p.answer+1)%21,firstTryCorrect:correct,hint:!correct,scaffoldDepth:correct?0:4,
  latencyMs:correct?2500:null,representation:'visual',context:'practice'};
 s.data.attempts.push(a);return a;
}
function draw(s:SaveService,id:SkillId,count:number,seed=73,correct=true){
 const engine=new MathEngine(s,seed),problems:Problem[]=[];
 for(let i=0;i<count;i++){const p=engine.next(id,i%5,'practice');problems.push(p);record(s,p,correct);}
 return problems;
}
const expectedSizes:Record<SkillId,number>={N0:6,N1:21,A1:21,A2:51,A3:5,A4:66,A5:110,A6:36,A7:231,S1:21,S2:30,S3:66,S4:54,S5:36,S6:231};

describe('complete addition and subtraction content',()=>{
 it('contains every ordered sum and every nonnegative subtraction within 20, including boundaries',()=>{
  const addition:string[]=[],subtraction:string[]=[];
  for(let whole=0;whole<=20;whole++)for(let part=0;part<=whole;part++){
   addition.push(`${part}+${whole-part}`);subtraction.push(`${whole}−${part}`);
  }
  expect(factBank('A7').map(f=>f.key).sort()).toEqual(addition.sort());
  expect(factBank('S6').map(f=>f.key).sort()).toEqual(subtraction.sort());
  for(const f of factBank('A7'))expect(factBank('S6').some(s=>s.a===f.answer&&s.b===f.a&&s.answer===f.b)).toBe(true);
 });
 for(const skill of skills)it(`${skill.id}: all ${expectedSizes[skill.id]} eligible questions appear once before the next normal rotation`,()=>{
  const bank=factBank(skill.id),s=focused();
  expect(bank).toHaveLength(expectedSizes[skill.id]);
  expect(new Set(bank.map(f=>f.key)).size).toBe(bank.length);
  const cycle=draw(s,skill.id,bank.length*2);
  expect(new Set(cycle.slice(0,bank.length).map(evidenceKey))).toEqual(new Set(bank.map(f=>f.key)));
  expect(new Set(cycle.slice(bank.length).map(evidenceKey))).toEqual(new Set(bank.map(f=>f.key)));
  expect(cycle.every(p=>JSON.stringify(generate(p.skillId,p.seed))===JSON.stringify(p))).toBe(true);
  expect(factCoverage(s.data,skill.id).seen).toBe(bank.length);
 });
 it('includes both addition orders in introductory skills and all make-ten boundaries',()=>{
  for(const id of ['A1','A2','A4','A5','A6','A7'] as const)for(const f of factBank(id)){
   expect(factBank(id).some(other=>other.a===f.b&&other.b===f.a)).toBe(true);
  }
  expect(factBank('A4').map(f=>f.key)).toContain('10+0');
  expect(factBank('A7').map(f=>f.key)).toEqual(expect.arrayContaining(['0+20','20+0','10+10','19+1','1+19','9+9','7+6','6+7']));
  expect(factBank('S6').map(f=>f.key)).toEqual(expect.arrayContaining(['20−0','20−20','0−0','20−1','20−19','13−5','10−7']));
 });
});

describe('short focused sessions and saved practice',()=>{
 it('gives varied A7 and S6 practice over many starting seeds, without adjacent reversals',()=>{
  for(const id of ['A7','S6'] as const)for(let seed=0;seed<40;seed++){
   const list=draw(focused(),id,30,seed),lookup=new Map(factBank(id).map(f=>[f.key,f]));
   expect(new Set(list.map(evidenceKey)).size).toBe(30);
   expect(new Set(list.slice(0,5).map(p=>lookup.get(evidenceKey(p))!.band)).size).toBeGreaterThanOrEqual(4);
   expect(new Set(list.map(p=>p.answer)).size).toBeGreaterThanOrEqual(12);
   expect(list.filter(p=>p.b<=2).length).toBeLessThanOrEqual(15);
   for(let i=1;i<list.length;i++)expect(list[i].family).not.toBe(list[i-1].family);
  }
 });
 it('manual practice, gates, refills and diagnostics stay on the requested skill',()=>{
  const s=focused();for(const p of Object.values(s.data.progress))p.consolidated=true;
  const e=new MathEngine(s,1);
  for(const context of ['practice','gate','refill','parent-check'] as const)for(let i=0;i<5;i++)expect(e.next('A7',i,context).skillId).toBe('A7');
  s.data.settings.auto=true;
  expect(e.next('A7',4,'parent-check').skillId).toBe('A7');
 });
 it('automatic review stays below the selected skill and configured ceiling and rotates learned skills',()=>{
  const s=new SaveService();s.data.settings.maxSkill='A4';for(const p of Object.values(s.data.progress))p.consolidated=true;
  const e=new MathEngine(s,2),reviewed=new Set<SkillId>();
  for(let i=0;i<6;i++){const p=e.next('A4',3,'practice');reviewed.add(p.skillId);record(s,p);}
  expect(reviewed).toEqual(new Set(['N0','N1','A1','S1','A2','A3']));
 });
 it('escapes the old three-family trap without clearing progress and resumes coverage after every reload',()=>{
  let s=focused();
  for(let i=0;i<60;i++){
   const f=factBank('A7').findIndex(f=>f.key===['19+0','16+2','2+16'][i%3]);record(s,generate('A7',f*4));
  }
  s.data.session.newFamilies=['A7:0:19:19','A7:2:16:18','A7:0:20:20'];
  const oldFamilies=[...s.data.session.newFamilies],seen=new Set<string>();
  for(let i=0;i<228;i++){
   const p=new MathEngine(s,i+8).next('A7',i%5,'practice');seen.add(evidenceKey(p));record(s,p);
   const restored=new SaveService();restored.import(JSON.stringify(s.data));s=restored;
  }
  expect(seen.size).toBe(228);expect(seen.has('19+0')).toBe(false);expect(seen.has('16+2')).toBe(false);
  expect(factCoverage(s.data,'A7').seen).toBe(231);expect(s.data.session.newFamilies).toEqual(oldFamilies);
  expect(validateSave(s.data)).toBe(true);
 });
 it('counts quantities by value and unsubmitted screens do not become permanent evidence',()=>{
  const s=focused(),e=new MathEngine(s,19);
  const questions=Array.from({length:6},()=>e.next('N0',0,'practice'));
  expect(new Set(questions.map(p=>p.answer)).size).toBe(6);
  expect(factCoverage(s.data,'N0').seen).toBe(0);
  record(s,questions[0]);expect(factCoverage(s.data,'N0').seen).toBe(1);
 });
 it('reads old template evidence from equations, combines related skills, and respects evidence resets',()=>{
  const s=focused(),p=generate('A1',factBank('A1').findIndex(f=>f.key==='2+3')*4);
  const a=record(s,p);a.templateId='A1-0';a.seed=91827;
  expect(factCoverage(s.data,'A7').seen).toBe(0);
  expect(factCoverage(s.data,'A7',true).seen).toBe(1);
  s.data.progress.A1.resetAt=a.time+1;
  expect(factCoverage(s.data,'A7',true).seen).toBe(0);
 });
});

describe('spaced support without sacrificing coverage',()=>{
 it('retries a missed fact after three other questions and stops the extra retry after independent success',()=>{
  const s=focused(),e=new MathEngine(s,23),first=e.next('A7',0,'practice');record(s,first,false);
  for(let i=1;i<4;i++){const p=e.next('A7',i,'practice');expect(p.family).not.toBe(first.family);record(s,p);}
  const retry=e.next('A7',4,'practice');expect(evidenceKey(retry)).toBe(evidenceKey(first));record(s,retry,true);
  for(let i=0;i<12;i++){const p=e.next('A7',i%5,'practice');expect(evidenceKey(p)).not.toBe(evidenceKey(first));record(s,p);}
 });
 it('still reaches every fact if every answer needs help, with no more than one extra retry in four',()=>{
  for(const id of ['A7','S6'] as const){
   const list=draw(focused(),id,308,11,false),seen=new Set<string>(),repeats:number[]=[];
   list.forEach((p,i)=>{if(seen.has(evidenceKey(p)))repeats.push(i);seen.add(evidenceKey(p));});
   expect(seen.size).toBe(231);expect(repeats.length).toBeLessThanOrEqual(77);
   // Before the first full pass is finished, repeats only occupy the reserved slots.
   const covered=new Set<string>();for(let i=0;i<list.length&&covered.size<231;i++){
    if(covered.has(evidenceKey(list[i])))expect(i%4).toBe(0);covered.add(evidenceKey(list[i]));
   }
  }
 });
 it('cannot consolidate a broad skill from a tiny repeated fact set',()=>{
  const s=focused(),m=new MasteryService(s),p=generate('A7',0);
  for(let i=0;i<30;i++){
   const a=record(s,p);s.data.attempts.pop();a.sessionId=`day-${i%3}`;m.record(a);
  }
  expect(s.data.progress.A7.consolidated).toBe(false);
 });
 it('varied independent work across sessions can consolidate and preserves the same accuracy and timing gates',()=>{
  const s=focused(),m=new MasteryService(s),e=new MathEngine(s,51);
  for(let i=0;i<30;i++){
   const p=e.next('A7',i%5,'practice'),a=record(s,p);s.data.attempts.pop();a.sessionId=`day-${i%3}`;m.record(a);
  }
  expect(s.data.progress.A7.consolidated).toBe(true);expect(s.data.progress.A7.fluent).toBe(true);
 });
});
