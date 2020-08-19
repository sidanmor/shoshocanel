self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('fox-store').then(function(cache) {
     return cache.addAll([
       '/packages/bootstrap/dist/610c9af7741d6ff536d16808e193a426.jpg',
       '/packages/bootstrap/dist/738b29ce90556694f944fdce1982ce2a.jpg',
       '/packages/bootstrap/dist/dc3ef66ce403fa65abe065776d7a2eab.jpg',
       '/packages/bootstrap/dist/ca7d601389c008f69e2fa2d738d7f37c.jpg',
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
