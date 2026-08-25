/*
 * Español y Mate — os três comportamentos da página.
 * Sem bibliotecas externas e sem coleta de dados.
 */

/*
 * 1. Fontes do Google: o <link> vem como "preload" para não travar o desenho
 * da página. Aqui ele vira folha de estilo de verdade, já com o HTML lido.
 * Sem JavaScript, o <noscript> do index.html faz o mesmo papel.
 */
(function () {
  'use strict';
  var fonte = document.getElementById('fonte-google');
  if (fonte && fonte.rel === 'preload') fonte.rel = 'stylesheet';
})();

/*
 * Español y Mate — comportamento da navegação em telas pequenas.
 * 2. Menu do celular: abre e fecha, com teclado e leitores de tela.
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
 * 3. Posts do Instagram: cada <li class="insta-item"> tem um data-post com o
 * endereço do post. O quadro do próprio Instagram só é criado quando a seção
 * chega perto da tela — assim o carregamento da página não paga por ele.
 *
 * Sem JavaScript, ficam os cartões que já estão no HTML, cada um linkando para
 * o post: o site nunca aparece quebrado.
 *
 * Só o quadro é do Instagram: nenhum script da Meta roda dentro do site.
 */
(function () {
  'use strict';

  var itens = document.querySelectorAll('.insta-item[data-post]');
  if (!itens.length) return;

  // Aceita o link inteiro (post, reel ou tv) ou só o código do post
  function endereco(valor) {
    var texto = String(valor || '').trim();
    if (!texto) return '';
    var achado = texto.match(/instagram\.com\/(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
    if (achado) {
      var tipo = achado[1] === 'reels' ? 'reel' : achado[1];
      return 'https://www.instagram.com/' + tipo + '/' + achado[2] + '/';
    }
    return /^[A-Za-z0-9_-]{6,}$/.test(texto) ? 'https://www.instagram.com/p/' + texto + '/' : '';
  }

  function montar(item, indice) {
    if (item.getAttribute('data-montado')) return;
    var url = endereco(item.getAttribute('data-post'));
    if (!url) return;
    item.setAttribute('data-montado', 'sim');

    var caixa = document.createElement('div');
    caixa.className = 'insta-embed';

    var quadro = document.createElement('iframe');
    quadro.src = url + 'embed/';
    quadro.title = 'Publicação ' + (indice + 1) + ' do Instagram de @betina.simon.9';
    quadro.loading = 'lazy';
    quadro.referrerPolicy = 'strict-origin-when-cross-origin';
    quadro.setAttribute('frameborder', '0');
    quadro.setAttribute('scrolling', 'no');
    caixa.appendChild(quadro);

    var link = document.createElement('a');
    link.className = 'insta-ver insta-ver-link';
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Ver no Instagram';
    link.setAttribute('aria-label', 'Ver a publicação ' + (indice + 1) + ' no Instagram de @betina.simon.9');

    item.textContent = '';
    item.appendChild(caixa);
    item.appendChild(link);
  }

  var lista = Array.prototype.slice.call(itens);

  if (typeof window.IntersectionObserver !== 'function') {
    lista.forEach(montar);
    return;
  }

  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;
      observador.unobserve(entrada.target);
      montar(entrada.target, lista.indexOf(entrada.target));
    });
  }, { rootMargin: '500px 0px' });

  lista.forEach(function (item) { observador.observe(item); });
})();
