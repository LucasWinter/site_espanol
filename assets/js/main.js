/*
 * Español y Mate — comportamento da navegação em telas pequenas.
 * Único script do site: abre e fecha o menu, com teclado e leitores de tela.
 * Sem bibliotecas externas e sem coleta de dados.
 */
(function () {
  'use strict';

  var header = document.getElementById('site-header');
  var toggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  var backdrop = document.getElementById('nav-backdrop');

  if (!header || !toggle || !nav || !backdrop) return;

  var LABEL_OPEN = 'Abrir menu de navegação';
  var LABEL_CLOSE = 'Fechar menu de navegação';

  function isOpen() {
    return header.getAttribute('data-nav-open') === 'true';
  }

  function openNav() {
    header.setAttribute('data-nav-open', 'true');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', LABEL_CLOSE);
    backdrop.hidden = false;
    document.body.classList.add('nav-lock');
  }

  function closeNav(returnFocus) {
    if (!isOpen()) return;
    header.setAttribute('data-nav-open', 'false');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', LABEL_OPEN);
    backdrop.hidden = true;
    document.body.classList.remove('nav-lock');
    if (returnFocus) toggle.focus();
  }

  toggle.addEventListener('click', function () {
    if (isOpen()) {
      closeNav(false);
    } else {
      openNav();
    }
  });

  backdrop.addEventListener('click', function () {
    closeNav(false);
  });

  // Clicar em um item do menu leva à seção e fecha a gaveta
  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) closeNav(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' || event.key === 'Esc') closeNav(true);
  });

  // Ao voltar para o layout de desktop, a gaveta não pode ficar presa aberta
  var wide = window.matchMedia('(min-width: 961px)');
  var onChange = function (event) {
    if (event.matches) closeNav(false);
  };
  if (typeof wide.addEventListener === 'function') {
    wide.addEventListener('change', onChange);
  } else if (typeof wide.addListener === 'function') {
    wide.addListener(onChange);
  }
})();
