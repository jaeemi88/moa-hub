// 허브 설치용 서비스 워커 (2026-10-04)
// 휴대폰이 허브를 '설치할 수 있는 앱'으로 알아보게 하는 용도라, 아무것도 저장(캐시)하지 않고 그대로 인터넷에서 받아요.
// → 앱을 고쳐 배포하면 바로 새 화면이 보여요.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).catch(function () {
    return new Response('<meta charset="utf-8"><meta name="viewport" content="width=device-width"><p style="font-family:sans-serif;padding:24px;line-height:1.6">인터넷 연결을 확인한 뒤 다시 열어 주세요.</p>', { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }));
});
