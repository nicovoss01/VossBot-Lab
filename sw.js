// App shell: network first. Exercise atlases: cache first, downloaded on demand.
const CACHE = 'vossfit-live-gym-gallery-v2';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));});
self.addEventListener('fetch', event => {
 const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 const art=/\/assets\/exercises\/(?:atlas-\d+\.webp|face-pull-(?:start|pull)\.png)$/.test(new URL(req.url).pathname);
 const network=()=>fetch(req,{cache:'no-cache'}).then(res=>{if(res&&res.ok){const copy=res.clone();event.waitUntil(caches.open(CACHE).then(c=>c.put(req,copy)).catch(()=>{}));}return res;});
 event.respondWith((art?caches.match(req).then(hit=>hit||network()):network()).catch(async()=>{const hit=await caches.match(req);if(hit)return hit;if(req.mode==='navigate')return (await caches.match('./'))||(await caches.match('./index.html'))||Response.error();return Response.error();}));
});
