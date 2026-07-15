(function () {
  'use strict';

  var STORAGE_KEY = 'cl-cookie-consent';
  var METRIKA_ID = 109790059;

  /* Аналитика грузится только после согласия — как обещает п. 8.2 политики */
  function loadMetrika() {
    if (window._clMetrikaLoaded) return;
    window._clMetrikaLoaded = true;
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      k = e.createElement(t); a = e.getElementsByTagName(t)[0];
      k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
    window.ym(METRIKA_ID, 'init', {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true
    });
  }

  if (localStorage.getItem(STORAGE_KEY)) {
    loadMetrika();
    return;
  }

  var style = document.createElement('style');
  style.textContent =
    '#cl-cookie-bar{position:fixed;left:0;right:0;bottom:0;z-index:2000;' +
    'display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:16px;' +
    'padding:18px 24px;background:rgba(11,15,13,.92);-webkit-backdrop-filter:blur(20px) saturate(160%);' +
    'backdrop-filter:blur(20px) saturate(160%);border-top:1px solid rgba(255,255,255,.07);' +
    'font-family:"Plus Jakarta Sans",sans-serif;' +
    'transform:translateY(0);opacity:1;transition:transform .45s cubic-bezier(.16,1,.3,1),opacity .45s ease}' +
    '#cl-cookie-bar.cl-hide{transform:translateY(100%);opacity:0;pointer-events:none}' +
    '#cl-cookie-bar p{margin:0;color:#9BA8A0;font-size:12.5px;line-height:1.6;max-width:760px}' +
    '#cl-cookie-bar a{color:#34D399;text-decoration:underline}' +
    '#cl-cookie-accept{flex:none;border:none;cursor:pointer;background:#34D399;color:#07110C;' +
    'font-family:inherit;font-weight:700;font-size:11px;letter-spacing:.14em;text-transform:uppercase;' +
    'padding:12px 26px;border-radius:2px;transition:background .2s ease,transform .2s ease}' +
    '#cl-cookie-accept:hover{background:#6EE7B7;transform:translateY(-1px)}' +
    '@media(max-width:640px){#cl-cookie-bar{padding:16px}}';
  document.head.appendChild(style);

  var bar = document.createElement('div');
  bar.id = 'cl-cookie-bar';
  bar.setAttribute('role', 'dialog');
  bar.setAttribute('aria-label', 'Уведомление об использовании cookie');
  bar.innerHTML =
    '<p>Мы используем файлы cookie и Яндекс.Метрику для анализа трафика и улучшения сайта. ' +
    'Продолжая работу с сайтом, вы соглашаетесь с нашей <a href="/policy">политикой конфиденциальности</a>.</p>' +
    '<button id="cl-cookie-accept" type="button">Принять</button>';
  document.body.appendChild(bar);

  var prevPaddingBottom = document.body.style.paddingBottom;
  function reserveSpace() {
    document.body.style.paddingBottom = bar.getBoundingClientRect().height + 'px';
  }
  reserveSpace();
  window.addEventListener('resize', reserveSpace);

  document.getElementById('cl-cookie-accept').addEventListener('click', function () {
    localStorage.setItem(STORAGE_KEY, '1');
    loadMetrika();
    bar.classList.add('cl-hide');
    document.body.style.paddingBottom = prevPaddingBottom;
    window.removeEventListener('resize', reserveSpace);
    setTimeout(function () { bar.remove(); }, 450);
  });
})();
