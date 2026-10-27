/* 강의 시간에만 열리는 화면 (2026-10-27 대표님 결정)
   조립기(/intro, /essay)·STAR 경험카드(/star)의 <head>에서 가장 먼저 불러옵니다.
     <script src="/class-gate.js"></script>
   · 허브에서 강의 입장 코드로 들어온 학생: 허브가 localStorage moa_class_until(코드 끝나는 시각)을 남김 → 그때까지 열림
   · 강사·원장님: 이 기기에 강사 확인 정보(staff-guard.js의 moa_staff_pin / moa_staff_key)가 있으면 언제든 열림
   · 그 밖에는 화면을 가리고 허브 입장 안내만 보여 줌. STAR 경험카드에 저장된 내용은 지우지 않음
   ※ AI 비용이 없는 화면이라 학생 기기에서만 확인함 (서버 확인 없음) */
(function () {
  function ls(k) { try { return localStorage.getItem(k) || ''; } catch (e) { return ''; } }
  var until = +ls('moa_class_until') || 0;
  if (Date.now() < until || ls('moa_staff_pin') || ls('moa_staff_key')) return;
  var css = document.createElement('style');
  css.textContent = 'body>*:not(#moa-gate){display:none !important}' +
    '#moa-gate{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px 16px;box-sizing:border-box;font-family:var(--font-sans,"Noto Sans KR",sans-serif)}' +
    '#moa-gate .g{max-width:420px;width:100%;border:1px solid var(--c-line,#E6E8EE);border-radius:16px;padding:24px;background:#fff;text-align:center}' +
    '#moa-gate .o{font-size:12.5px;font-weight:700;letter-spacing:.06em;color:var(--c-muted,#5F6678)}' +
    '#moa-gate h1{font-size:20px;margin:8px 0;color:var(--c-ink,#1F3A6E);word-break:keep-all;text-wrap:balance}' +
    '#moa-gate p{font-size:14px;line-height:1.6;color:var(--c-ink-2,#3B4256);margin:0 0 18px;word-break:keep-all}' +
    '#moa-gate a{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 20px;border-radius:8px;background:var(--c-brand,#1F3A6E);color:#fff;font-weight:700;text-decoration:none}';
  document.head.appendChild(css);
  function show() {
    if (document.getElementById('moa-gate')) return;
    var d = document.createElement('div');
    d.id = 'moa-gate';
    d.innerHTML = '<div class="g"><div class="o">MOA FORMULA</div><h1>강의 시간에만 이용할 수 있습니다</h1>' +
      '<p>허브에서 강의 입장 코드로 들어온 뒤 앱 목록에서 열어 주세요. 입장 코드의 사용 기간이 끝나면 다음 강의 때 다시 열립니다.</p>' +
      '<a href="/">허브로 가기</a></div>';
    document.body.appendChild(d);
  }
  if (document.body) show(); else document.addEventListener('DOMContentLoaded', show);
})();
