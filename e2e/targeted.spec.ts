import {test,expect} from '@playwright/test';
test('reported map/new-adventure route uses only four Grade1 subtraction skills',async({page})=>{
 await page.goto('/');await page.locator('#parent').click();await page.locator('#password').fill('admin123');await page.locator('#unlock').click();await expect(page.locator('#grade3-preset')).toHaveCount(0);
 await page.locator('#clear-selection').click();await page.locator('#mode').selectOption('targeted');await page.locator('#lo').selectOption('3');await page.locator('#hi').selectOption('3');await page.locator('#skill-search').fill('g3-submissing');await page.locator('#skills input[value="g3-submissing"]').check();await page.locator('#save-settings').click();await page.locator('#close-settings').click();await page.locator('#play').click();await page.locator('#go').click();
 const old=await page.evaluate(()=>(window as any).__QUEST_DEBUG__.math.gate);expect(old.item.skillId).toBe('g3-submissing');
 await page.locator('#math-settings').click();await page.locator('#password').fill('admin123');await page.locator('#unlock').click();await page.locator('#skill-search').fill('subtract');
 const ids=await page.locator('#skills label').evaluateAll(labels=>labels.filter(el=>el.textContent!.trim().startsWith('G1 ·')).map(el=>el.querySelector('input')!.value));expect(ids).toHaveLength(4);
 for(const id of ids)await page.locator(`#skills input[value="${id}"]`).check();await expect(page.locator('#selected-heading')).toHaveText('Selected skills (5)');
 await page.locator('[data-unselect="g3-submissing"]').click();await page.locator('#save-settings').click();await expect(page.locator('#notice')).toContainText('4 skills');expect(await page.evaluate(()=>(window as any).__QUEST_DEBUG__.math.gate)).toEqual(old);
 await page.locator('#close-settings').click();await page.locator('#save-home').click();await page.locator('#map').click();await page.locator('[data-quest="0"]').click();await page.locator('#newq').click();await page.locator('#go').click();
 for(let i=0;i<5;i++){const q=await page.evaluate(()=>(window as any).__QUEST_DEBUG__.problem);expect(ids).toContain(q.skillId);await page.keyboard.press('Delete');await page.keyboard.type(String(q.answer));await page.locator('#submit').click();}await expect(page.locator('#adventure')).toBeVisible();
});
