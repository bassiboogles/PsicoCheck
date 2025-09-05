
(function(){
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));

  const THEME_KEY='pc_theme';
  function applyTheme(t){ document.documentElement.classList.toggle('dark', t==='dark'); localStorage.setItem(THEME_KEY,t); }
  function initTheme(){ const saved=localStorage.getItem(THEME_KEY); const prefers=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'; applyTheme(saved||prefers); }

  const LANG_KEY='pc_lang';
  function t(key){ const lang=localStorage.getItem(LANG_KEY)||'es'; return key.split('.').reduce((acc,k)=>acc&&acc[k], I18N[lang])||key; }
  function applyI18N(){ const lang=localStorage.getItem(LANG_KEY)||'es'; document.documentElement.lang= lang==='es'?'es-MX':'en'; $$('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n)); $$('[data-i18n-ph]').forEach(el=>el.placeholder=t(el.dataset.i18nPh)); }
  function toggleLang(){ const next=(localStorage.getItem(LANG_KEY)||'es')==='es'?'en':'es'; localStorage.setItem(LANG_KEY,next); applyI18N(); }

  function setupNav(){ const btn=$('#btn-menu'), list=$('#menu'); if(btn&&list){ btn.addEventListener('click', ()=> list.classList.toggle('open')); } const here=location.pathname.split('/').pop()||'index.html'; $$('#menu a[data-active]').forEach(a=>{ if(a.getAttribute('href')===here) a.classList.add('active'); }); }

  window.PC = { toggleTheme: ()=> applyTheme(document.documentElement.classList.contains('dark')?'light':'dark'), toggleLang };

  document.addEventListener('DOMContentLoaded', ()=>{ initTheme(); applyI18N(); setupNav(); });
})();
