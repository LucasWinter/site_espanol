# Español y Mate — site da professora Betina

Página institucional de uma professora de espanhol (aulas online individuais e
programas corporativos presenciais em Porto Alegre).

Site **estático** — HTML, CSS e um único arquivo JavaScript. Sem framework, sem
banco de dados, sem dependências para instalar. Hospedagem na Vercel.

> Para trocar textos de contato, telefone, redes e imagens, veja
> **[PERSONALIZAR.md](PERSONALIZAR.md)**. É o único arquivo que você precisa
> abrir para colocar o site no ar com os dados reais.

## Estrutura

```
index.html               A página inteira (todas as seções)
assets/css/styles.css    Toda a aparência: cores, fontes, espaçamentos, responsivo
assets/js/main.js        Só o menu de navegação do celular
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
- Nenhum rastreador, nenhum cookie, nenhuma biblioteca de terceiros no JavaScript.
- `vercel.json` aplica CSP, `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy` e HSTS.
- Links externos usam `rel="noopener"`.
- Nenhuma chave, senha ou variável de ambiente é usada pelo site.

> Se um dia forem adicionados scripts externos (pixel, chat, analytics), a
> política de CSP em `vercel.json` precisa liberar esse domínio — caso contrário
> o navegador bloqueia o script.
