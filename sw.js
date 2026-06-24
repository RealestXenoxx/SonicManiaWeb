var _cacheName = 'sonicmania-discord-1';
var _cacheFiles = [
	'RSDKv5.html',
	'RSDKv5.js',
	'RSDKv5.wasm',
	'https://1518811573840253048.discordsays.com/gamedata/xsfgty.rsdk'
];
	
self.addEventListener('install', (e) => {
	console.log('[Service Worker] Install');
	e.waitUntil(
	    caches.open(_cacheName).then((cache) => {
	      console.log('[Service Worker] Caching all: Game executable and web files');
	      return cache.addAll(_cacheFiles);
	    })
	);
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((r) => {
          console.log('[Service Worker] Fetching resource: '+e.request.url);
          return r || fetch(e.request).then((response) => {
                return caches.open(_cacheName).then((cache) => {
                	console.log('[Service Worker] Caching new resource: '+e.request.url);
                	cache.put(e.request, response.clone());
          			return response;
        });
      });
    })
  );
});
