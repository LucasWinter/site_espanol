# Español y Mate — site da professora Betina

Página institucional de uma professora de espanhol (aulas online e programas
corporativos in company).

Site **estático** — HTML, CSS e um único arquivo JavaScript. Sem framework, sem
banco de dados, sem dependências para instalar. Hospedagem na Vercel.

> Para trocar textos de contato, telefone, redes e imagens, veja
> **[PERSONALIZAR.md](PERSONALIZAR.md)**. É o único arquivo que você precisa
> abrir para colocar o site no ar com os dados reais.

## Estrutura

```
index.html               A página inteira (todas as seções)
assets/css/styles.css    Toda a aparência: cores, fontes, espaçamentos, responsivo
assets/js/main.js        Menu do celular e os quadros do Instagram
assets/img/              Imagens (hoje são exemplos, para substituir)
vercel.json              Configuração de publicação e cabeçalhos de segurança
robots.txt / sitemap.xml Indexação em buscadores
design/                  Arquivo original do Claude Design (referência visual)
```

## Rodar localmente

Qualquer servidor estático serve. Por exemplo:

```bash
npx http-server -p 8080 .
# abra http://localhost:8080
```

Abrir o `index.html` direto pelo navegador (`file://`) também funciona, mas os
caminhos absolutos (`/assets/...`) só resolvem com um servidor.

## Identidade visual

Tokens definidos no topo de `assets/css/styles.css`, extraídos do design entregue:

| Papel | Cor |
| --- | --- |
| Fundo (papel) | `#F4EFE4` |
| Superfície | `#EBE3D3` |
| Tinta (texto) | `#2B3323` |
| Terracota (destaque) | `#A9552F` |
| Verde-oliva (segundo destaque) | `#4C5B39` |

Tipografia: **Cormorant Garamond** (títulos), **Source Serif 4** (texto),
**Caveat** (manuscrita). Carregadas do Google Fonts.

## Desempenho

Página estática, sem framework: o carregamento inicial são 7 arquivos e ~77 kB,
com primeiro desenho em torno de 150 ms e nenhum deslocamento de layout
(imagens e quadros têm dimensão reservada).

Três cuidados que sustentam isso e não devem ser desfeitos sem motivo:

- **Fontes não bloqueiam o desenho.** O `<link>` do Google Fonts entra como
  `rel="preload"` e o `main.js` o promove a folha de estilo (o `<noscript>` cobre
  quem está sem JavaScript). Sem isso, uma rede que filtre o Google — comum em
  empresa — deixa a página em branco até o pedido expirar.
- **Os quadros do Instagram só são criados perto da hora de aparecer**
  (`IntersectionObserver`). Quem não desce até o final não carrega nada da Meta.
- **Só os pesos de fonte que a folha de estilo usa** são pedidos ao Google.

Próximo passo possível, se um dia quiser cortar o terceiro domínio de vez:
hospedar os `.woff2` em `assets/fonts/` e apagar o `preconnect` do Google.

## Publicação (Vercel)

Deploy de teste no ar (preview):
`https://espanol-y-mate-betina-p2pn99qs6-lucaswinters-projects.vercel.app`
(projeto Vercel `espanol-y-mate-betina`, conta `lucaswinters-projects`).

Esse deploy foi feito por envio direto dos arquivos. Para que **todo push no
GitHub gere um novo deploy automático**, falta uma ligação que precisa ser
feita pelo painel (a integração usada aqui não tem permissão para isso):

1. Vercel → projeto `espanol-y-mate-betina` → **Settings → Git**
2. **Connect Git Repository** → `LucasWinter/site_espanol`
3. Em **Production Branch**, escolher a branch que deve ir ao ar
4. Em **Settings → Domains**, apontar o domínio próprio quando existir

Projetos vazios criados durante as tentativas de conexão e que podem ser
apagados: `site-espanol`, `site-espanol-y-mate`, `espanol-y-mate`.

## Segurança

- Site 100% estático: não recebe dados de visitantes, não tem formulário,
  banco de dados nem área logada.
- Nenhum rastreador e nenhuma biblioteca de terceiros no JavaScript. O site em
  si não grava cookies; os quadros do Instagram no final da página gravam os
  cookies deles dentro do próprio quadro (ver PERSONALIZAR.md).
- `vercel.json` aplica CSP, `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy` e HSTS.
- Links externos usam `rel="noopener"`.
- Nenhuma chave, senha ou variável de ambiente é usada pelo site.

> Se um dia forem adicionados scripts externos (pixel, chat, analytics), a
> política de CSP em `vercel.json` precisa liberar esse domínio — caso contrário
> o navegador bloqueia o script.
