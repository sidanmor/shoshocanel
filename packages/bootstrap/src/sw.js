self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('shosho-canel-store').then(function(cache) {
     return cache.addAll([
       '/packages/bootstrap/dist/index.html',
       '/packages/bootstrap/dist/bundle.min.js',
       '/packages/bootstrap/dist/icon/fox-icon.png',
       '/packages/bootstrap/dist/manifest.webmanifest',
     ]);
   })
 );
});

self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
