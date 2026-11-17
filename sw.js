const C='ttm-shell-v1';
self.addEventListener('install',e=>{e.waitUntil(self.skipWaiting())});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data&&e.data.cache)e.waitUntil(caches.open(C).then(c=>c.add(e.data.cache)).catch(()=>{}))});
self.addEventListener('fetch',e=>{
const r=e.request;
if(r.method!=='GET'||new URL(r.url).origin!==self.location.origin)return;
e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(h=>h||caches.match(r.url.split('#')[0]))))});
