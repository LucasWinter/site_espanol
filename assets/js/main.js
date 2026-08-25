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

/*
 * Carrossel do Instagram: as setas rolam a faixa de um post por vez.
 * No celular a rolagem é o próprio gesto de arrastar — as setas ficam ocultas.
 * Sem o script, a faixa continua rolável: nada deixa de funcionar.
 */
(function () {
  'use strict';

  var track = document.getElementById('insta-track');
  var prev = document.getElementById('insta-prev');
  var next = document.getElementById('insta-next');

  if (!track || !prev || !next) return;

  function passo() {
    var item = track.querySelector('.insta-item');
    if (!item) return track.clientWidth;
    var estilo = window.getComputedStyle(track);
    var vao = parseFloat(estilo.columnGap || estilo.gap) || 0;
    return item.getBoundingClientRect().width + vao;
  }

  function rolar(direcao) {
    var distancia = passo() * direcao;
    if (typeof track.scrollBy === 'function') {
      track.scrollBy({ left: distancia, behavior: 'smooth' });
    } else {
      track.scrollLeft += distancia;
    }
  }

  // Desliga a seta que não tem mais para onde ir
  function atualizar() {
    var fim = track.scrollWidth - track.clientWidth;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= fim - 2;
  }

  prev.addEventListener('click', function () { rolar(-1); });
  next.addEventListener('click', function () { rolar(1); });
  track.addEventListener('scroll', atualizar, { passive: true });
  window.addEventListener('resize', atualizar);

  atualizar();
})();

/*
 * Posts do Instagram: cada <li class="insta-item"> tem um data-post="".
 * Colando o link do post ali, o card vira o post de verdade, ao vivo, dentro de
 * um quadro do próprio Instagram. Vazio, fica o card de exemplo que já está no
 * HTML — o site nunca aparece quebrado.
 *
 * Só o quadro é do Instagram: nenhum script da Meta roda dentro do site.
 */
(function () {
  'use strict';

  var itens = document.querySelectorAll('.insta-item[data-post]');
  if (!itens.length) return;

  // Aceita o link inteiro (post, reel ou tv) ou só o código do post
  function codigoDoPost(valor) {
    var texto = String(valor || '').trim();
    if (!texto) return '';
    var achado = texto.match(/instagram\.com\/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
    if (achado) return achado[1];
    return /^[A-Za-z0-9_-]{6,}$/.test(texto) ? texto : '';
  }

  Array.prototype.forEach.call(itens, function (item, indice) {
    var codigo = codigoDoPost(item.getAttribute('data-post'));
    if (!codigo) return;

    var endereco = 'https://www.instagram.com/p/' + codigo + '/';

    var caixa = document.createElement('div');
    caixa.className = 'insta-embed';

    var quadro = document.createElement('iframe');
    quadro.src = endereco + 'embed/';
    quadro.title = 'Post ' + (indice + 1) + ' do Instagram de @betina.simon.9';
    quadro.loading = 'lazy';
    quadro.referrerPolicy = 'strict-origin-when-cross-origin';
    quadro.setAttribute('frameborder', '0');
    quadro.setAttribute('scrolling', 'no');
    caixa.appendChild(quadro);

    var link = document.createElement('a');
    link.className = 'insta-ver insta-ver-link';
    link.href = endereco;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Ver no Instagram';

    item.textContent = '';
    item.appendChild(caixa);
    item.appendChild(link);
  });
})();
