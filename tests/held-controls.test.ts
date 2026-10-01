// @vitest-environment happy-dom
import {test,expect,vi} from 'vitest';
import {bindHeldControls} from '../src/held-controls';
test('multi-contact release, capture failure/loss, outside release and interruptions return neutral',()=>{
 document.body.innerHTML='<div id="touch"><button data-control="left">Left</button><button data-control="right">Right</button><button data-control="jump">Jump</button></div>';
 const root=document.getElementById('touch')!,buttons=[...root.querySelectorAll('button')];const state:Record<string,boolean>={};for(const b of buttons)b.setPointerCapture=vi.fn();
 const dispose=bindHeldControls(root,(k,v)=>state[k]=v);
 const pointer=(el:EventTarget,type:string,id:number,buttons=1)=>el.dispatchEvent(new PointerEvent(type,{bubbles:true,pointerId:id,buttons}));
 pointer(buttons[0],'pointerdown',1);pointer(buttons[2],'pointerdown',2);expect(state).toMatchObject({left:true,jump:true});pointer(window,'pointerup',1);expect(state).toMatchObject({left:false,jump:true});pointer(window,'pointercancel',2);expect(state.jump).toBe(false);
 pointer(buttons[0],'pointerdown',3);pointer(buttons[0],'pointerdown',4);pointer(window,'pointerup',3);expect(state.left).toBe(true);pointer(buttons[0],'lostpointercapture',4);expect(state.left).toBe(false);
 buttons[1].setPointerCapture=()=>{throw Error('capture failed');};pointer(buttons[1],'pointerdown',5);expect(state.right).toBe(false);
 for(const event of ['blur','resize','orientationchange']){pointer(buttons[0],'pointerdown',6);window.dispatchEvent(new Event(event));expect(state.left).toBe(false);}
 pointer(buttons[2],'pointerdown',7);document.dispatchEvent(new Event('visibilitychange'));expect(state.jump).toBe(false);
 pointer(buttons[0],'pointerdown',8);pointer(window,'pointermove',8,0);expect(state.left).toBe(false);
 for(let i=0;i<30;i++){pointer(buttons[0],'pointerdown',i+20);pointer(window,'pointerup',i+20);expect(state.left).toBe(false);}
 pointer(buttons[2],'pointerdown',99);dispose();expect(state.jump).toBe(false);
});
