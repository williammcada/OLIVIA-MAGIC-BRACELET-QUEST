// @vitest-environment happy-dom
import {test,expect,vi} from 'vitest';
import {installViewport} from '../src/viewport';
test('follows Safari viewport resizing, preserves pinch zoom, and removes listeners',()=>{
 const viewport=Object.assign(new EventTarget(),{width:390,height:650,scale:1});
 vi.stubGlobal('visualViewport',viewport);
 vi.stubGlobal('requestAnimationFrame',(fn:FrameRequestCallback)=>{fn(0);return 1;});
 const refresh=vi.fn(),dispose=installViewport(refresh),style=document.documentElement.style;
 expect(style.getPropertyValue('--viewport-height')).toBe('650px');
 Object.assign(viewport,{width:844,height:290});viewport.dispatchEvent(new Event('resize'));
 expect(style.getPropertyValue('--viewport-height')).toBe('290px');
 expect(style.getPropertyValue('--viewport-width')).toBe('844px');
 Object.assign(viewport,{width:422,height:145,scale:2});viewport.dispatchEvent(new Event('resize'));
 expect(style.getPropertyValue('--viewport-height')).toBe('290px');
 expect(refresh).toHaveBeenCalledTimes(2);
 dispose();viewport.scale=1;viewport.dispatchEvent(new Event('resize'));
 expect(refresh).toHaveBeenCalledTimes(2);
 vi.unstubAllGlobals();
});
