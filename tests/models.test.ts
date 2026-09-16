// @vitest-environment happy-dom
import {it,expect} from 'vitest';
import {generate,buildScaffold,type SkillId} from '../src/core';
import {mathModel} from '../src/models';
function problem(id:SkillId,a:number,b:number){const p=Array.from({length:20000},(_,i)=>generate(id,i)).find(p=>p.a===a&&p.b===b);expect(p).toBeTruthy();return p!;}
it('shows all 18 beads for 9+9 and eight remaining beads after making ten',()=>{const p=problem('A6',9,9);document.body.innerHTML=mathModel(p,null,true);expect(document.querySelectorAll('.slot')).toHaveLength(20);expect(document.querySelectorAll('.count-bead')).toHaveLength(18);const steps=buildScaffold(p);document.body.innerHTML=mathModel(p,steps[0],true);expect(document.querySelectorAll('.count-bead')).toHaveLength(1);document.body.innerHTML=mathModel(p,steps[1],true);expect(document.querySelectorAll('.count-bead')).toHaveLength(8);});
it('represents subtraction as a whole, removed beads and the remainder',()=>{const p=problem('S5',13,5),steps=buildScaffold(p);document.body.innerHTML=mathModel(p,steps[1],true);expect(document.querySelectorAll('[data-remove]')).toHaveLength(13);document.body.innerHTML=mathModel(p,steps[2],true);expect(document.querySelectorAll('.removed')).toHaveLength(5);expect(document.querySelectorAll('.count-bead')).toHaveLength(8);});
it('represents taking all 20 away with no remaining beads',()=>{const p=problem('S6',20,20);document.body.innerHTML=mathModel(p,buildScaffold(p)[2],true);expect(document.querySelectorAll('.removed')).toHaveLength(20);expect(document.querySelectorAll('.count-bead')).toHaveLength(0);});
