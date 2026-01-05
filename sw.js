/* Service Worker für Kroatisch Master */
const cacheName = 'kroatisch-v8';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// Installieren des Service Workers und Speichern der Dateien im Cache
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Service Worker: Dateien werden gecacht');
      return cache.addAll(assets);
    })
  );
});

// Aktivieren und Löschen alter Cache-Versionen
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== cacheName) {
          console.log('Service Worker: Alter Cache wird gelöscht', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

// Abrufen der Dateien (zuerst aus dem Cache, dann aus dem Netzwerk)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
