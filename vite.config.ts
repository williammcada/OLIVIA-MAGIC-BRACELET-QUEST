import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';
import {readFileSync} from 'node:fs';
import {VERSION} from './src/version';
const pkg=JSON.parse(readFileSync(new URL('./package.json',import.meta.url),'utf8'));
if(pkg.version!==VERSION)throw Error('Package and displayed release versions must match.');
export default defineConfig({
 base:'./',
 plugins:[
  {name:'release-version',transformIndexHtml:html=>html.replace('<title>Olivia’s Magic Bracelet Quest</title>','<title>Olivia’s Magic Bracelet Quest · v'+VERSION+'</title>'),
   generateBundle(){this.emitFile({type:'asset',fileName:'version.json',source:JSON.stringify({version:VERSION,saveSchema:2})});}},
  VitePWA({registerType:'prompt',injectRegister:null,includeAssets:['icon-*.png'],
   manifest:{name:'Olivia’s Magic Bracelet Quest',short_name:'Olivia’s Quest',description:'Addition and subtraction adventures · v'+VERSION,theme_color:'#59457f',background_color:'#201933',display:'standalone',orientation:'any',start_url:'./',icons:[{src:'icon-192.png',sizes:'192x192',type:'image/png'},{src:'icon-512.png',sizes:'512x512',type:'image/png',purpose:'any'}]},
   workbox:{globPatterns:['**/*.{js,css,html,png,webp,json,woff2}'],maximumFileSizeToCacheInBytes:5000000,cleanupOutdatedCaches:true}})
 ],
 build:{chunkSizeWarningLimit:1600}
});
