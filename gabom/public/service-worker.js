// public/service-worker.js
/* eslint-disable no-restricted-globals */
const CACHE_NAME = "gabom-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/logo192.png",
  "/logo512.png",
];

// 설치 (앱 처음 실행 시)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// 요청 가로채기 (캐시 우선, 없으면 네트워크)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// 오래된 캐시 정리
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => !cacheWhitelist.includes(key) && caches.delete(key))
        )
      )
  );
});
