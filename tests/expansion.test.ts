import {test,expect} from 'vitest';
import {expansionSkills,expansionBank,regrouping} from '../src/expansion';
import {fresh,migrateSave,validateSave,SaveService,MasteryService,MathEngine,buildScaffold,generate,validateProblem,factCoverage} from '../src/core';
import {mathModel} from '../src/models';
import {formatMath} from '../src/math-format';
import {evidenceKey} from '../src/facts';

test('fresh defaults and existing settings/progress are preserved',()=>{
 const save=fresh();expect(save.settings.showCounters).toBe(false);expect(new MasteryService(new SaveService()).current()).toBe('S01');
 const old:any=structuredClone(save);old.settings.showCounters=true;old.settings.auto=true;old.settings.manualSkill='S5';old.completed=[0];old.rescued=['Mochi'];
 for(const [id] of expansionSkills)delete old.progress[id];
 const migrated:any=migrateSave(old);expect(validateSave(migrated)).toBe(true);expect(migrated.completed).toEqual([0]);expect(migrated.rescued).toEqual(['Mochi']);expect(migrated.settings).toEqual(old.settings);expect(Object.keys(migrated.progress).length).toBe(32);
});
for(const [id] of expansionSkills)test(`${id}: all bank items, constraints, support and saved evidence`,()=>{
 const bank=expansionBank(id);expect(bank.length).toBeGreaterThan(10);expect(new Set(bank.map(f=>f.key)).size).toBe(bank.length);
 for(let i=0;i<bank.length;i++){
  const f=bank[i],p=generate(id,i*4);expect(validateProblem(p)).toBe(true);expect(evidenceKey(p)).toBe(f.key);
  expect(mathModel(p,null,true)).toBe('');expect(buildScaffold(p).every(s=>!/bead|count the|pink|blue/i.test(s.instruction))).toBe(true);
  if(id.startsWith('S')){expect(p.answer).toBe(p.a-p.b);const r=regrouping(p.a,p.b);if(['S01','S02','S04'].includes(id))expect(r.count).toBe(1);if(id==='S03')expect(r.count).toBe(0);if(id==='S05'){expect(r.count).toBe(2);expect(r.acrossZero).toBe(false);}if(id==='S06')expect(r.acrossZero).toBe(true);if(id==='S07')expect(r.count).toBeGreaterThan(0);}
  if(id==='N01')expect(p.answer).toBe(p.a+p.b);
  if(id==='M01'||id==='M02')expect(p.answer).toBe(p.a*p.b);
  if(id==='M03')expect(p.answer).toBe(p.a/p.b);
  if(p.choices){expect(p.answer).toBeLessThan(p.choices.length);expect(new Set(p.choices).size).toBe(p.choices.length);}
 }
 const s=new SaveService(),engine=new MathEngine(s,23);const seen=new Set();
 for(let i=0;i<20;i++){const p=engine.next(id,0,'parent-check');seen.add(evidenceKey(p));s.data.attempts.push({...p,sessionId:'test',time:Date.now(),firstResponse:p.answer,firstTryCorrect:true,hint:false,scaffoldDepth:0,latencyMs:10000,representation:'abstract',context:'parent-check'});}
 expect(seen.size).toBe(Math.min(20,bank.length));expect(factCoverage(s.data,id).seen).toBe(seen.size);expect(validateSave(s.data)).toBe(true);const restored=new SaveService();restored.import(JSON.stringify(s.data));expect(restored.data.attempts).toEqual(s.data.attempts);
});
test('fraction markup stacks numerator and denominator and escapes other content',()=>{
 const html=formatMath('1/2 < 3/4');expect(html.match(/class="fraction"/g)).toHaveLength(2);expect(html).toContain('class="numerator">1');expect(html).toContain('class="denominator">2');expect(html).toContain('&lt;');expect(formatMath('<script>')).toBe('&lt;script&gt;');
});
test('comparison and fraction answer keys independently agree',()=>{
 for(const id of ['N03','F01'] as const)for(const f of expansionBank(id)){
  const match=f.prompt.replaceAll(',','').match(/^(\d+)(?:\/(\d+))? ___ (\d+)(?:\/(\d+))?$/);
  if(match){const [,a,b,c,d]=match;const left=Number(a)*Number(d||1),right=Number(c)*Number(b||1);expect(f.choices![f.answer]).toBe(left<right?'<':left===right?'=':'>');}
 }
 expect(expansionBank('M02').some(f=>f.answer===100)).toBe(true);
 expect(regrouping(452,178).count).toBe(2);expect(regrouping(452,127).count).toBe(1);
});
