# Como colocar os dados reais no site

Este guia é para quem **não é programador**. Tudo que precisa mudar antes de
publicar a versão final está listado aqui, com o arquivo e o que procurar.

Já estão **corretos** no site: o WhatsApp, o perfil do Instagram e os 3 posts
que aparecem no final da página.

Ainda são **exemplos e precisam ser trocados**: o e-mail, as imagens (retrato,
ambiente de aula e logo) e o endereço do site.

---

## 1. E-mail

**Arquivo:** `index.html`
**Procure por:** `ola@espanolymate.com.br` — aparece **2 vezes**, na mesma
linha da lista de contato (uma no link, outra no texto que o visitante lê).

Troque as 2 pelo e-mail verdadeiro.

O botão "Quero estudar espanhol" da seção de contato **abre o WhatsApp**, com a
mesma mensagem pronta do link de WhatsApp da lista — o e-mail fica só como
opção na lista de contato.

---

## 2. WhatsApp — já está o número real

**Arquivo:** `index.html`
**Está no site:** `+55 54 99631-5393` (o número que aparece no logo).

Se algum dia mudar, troque nos **dois** lugares da mesma linha: o número do link
(`wa.me/5554996315393`) e o número visível. Formato do link: `55` (Brasil) + DDD
sem o zero + número sem traço.

A mensagem que já vem escrita para o visitante enviar está depois de `?text=`.
Para mudar, escreva o texto trocando espaço por `%20` (ou peça para reescrever).

---

## 3. Instagram — já está o perfil real

**Arquivo:** `index.html`
**Está no site:** `@betina.simon.9`, na lista de contato e no botão "Seguir".

---

## 3b. Os posts do Instagram no final da página

São **3 posts**, lado a lado no computador e um abaixo do outro no celular.
Eles aparecem **ao vivo**, dentro de um quadro do próprio Instagram: se a
legenda ou a foto mudarem lá, mudam aqui sozinhas.

Os 3 que estão no ar hoje:

1. `https://www.instagram.com/p/DQCnnm-kXRw/`
2. `https://www.instagram.com/p/DFGk_b2SzQl/`
3. `https://www.instagram.com/p/CYFNL9JvnFH/`

Para trocar qualquer um deles:

1. Abra o post no Instagram e copie o endereço da barra do navegador
   (ex.: `https://www.instagram.com/p/C8xYz-1AbCd/`). **Não precisa estar logado.**
2. No `index.html`, procure por `POST 1`, `POST 2` ou `POST 3`.
3. Logo acima de cada comentário tem `data-post="..."`. Troque o endereço que
   está **dentro das aspas**. Fica assim:

   `<li class="insta-item" data-post="https://www.instagram.com/p/C8xYz-1AbCd/">`

4. Salve. Pronto — aquele card passa a mostrar o outro post.

Serve link de post (`/p/...`) e de reel (`/reel/...`).

Se um `data-post` ficar vazio ou com um endereço errado, aquele card mostra um
cartão discreto com o símbolo do Instagram, que leva ao perfil. O site nunca
fica quebrado no meio do caminho.

**Quantos posts?** Três é o número que fecha uma linha certinha no computador.
Dá para copiar ou apagar um bloco `<li class="insta-item">` inteiro, mas com 4
ou 5 a última linha fica incompleta.

**Dica sobre o formato:** os três cartões têm a mesma altura, para a linha ficar
reta. Posts quadrados e no formato 4:5 cabem inteiros; um reel em pé aparece
cortado embaixo (o começo do vídeo, que é o que interessa). Se quiser tudo
aparecendo inteiro, prefira posts quadrados ou 4:5.

### Por que não atualiza sozinho com os posts mais recentes

O Instagram **não oferece** um jeito público de listar os últimos posts de um
perfil. Para isso, alguém precisaria entrar na conta uma vez e autorizar um
serviço — não tem como contornar, é regra da Meta, não limitação do site.

O que temos aqui é o meio-termo: os posts escolhidos aparecem ao vivo e sempre
atualizados, e trocar quais posts aparecem é colar 3 links de vez em quando.

### O que isso mudou na segurança e na velocidade

Foi liberada **uma única coisa**: a permissão de exibir o quadro do Instagram
dentro da página (`frame-src`). **Nenhum script da Meta roda no site** — a
maioria dos sites instala o programa do Instagram, que é bem mais invasivo e
pesado; aqui não. O Instagram grava cookies próprios dentro do quadro dele, como
acontece em qualquer site que mostra post de rede social.

Os quadros só são criados quando o visitante chega perto do final da página.
Quem entra no site e não desce até lá **não carrega nada do Instagram**, e o
tempo de abertura da página não é afetado.

---

## 4. Imagens

**Pasta:** `assets/img/`

| Arquivo atual | Onde aparece | Arquivo ideal |
| --- | --- | --- |
| `logo.svg` | Cabeçalho, rodapé **e** ícone da aba | Logo oficial, **colorido**, fundo transparente |
| `retrato-professora.svg` | Topo da página, à direita | Retrato **vertical** da Betina, luz natural |
| `cuia_site1.svg` | Seção "Sobre" | Já é a ilustração aprovada da cuia com livros |

**Logo:** o arquivo `logo.svg` que está no site hoje ficou **todo preto** — a
conversão para vetor perdeu o verde e o terracota. Substitua por uma versão
colorida (SVG do arquivo original, ou PNG com fundo transparente) usando o mesmo
nome, e ele troca sozinho nos 3 lugares. Se for `.png`, salve como `logo.png` e
troque as **3** aparições de `logo.svg` no `index.html`.

Os arquivos de hoje são desenhos de exemplo. Para trocar:

1. Salve a foto na pasta `assets/img/` (formato `.jpg` ou `.webp`, largura de
   1200 a 1600 pixels, até ~400 KB para o site continuar rápido).
2. No `index.html`, procure por `retrato-professora.svg` e troque pelo nome do
   novo arquivo, **com a extensão nova** (ex.: `retrato-professora.jpg`).
3. Ajuste o texto do `alt="..."` ao lado, que descreve a foto para quem usa
   leitor de tela e para o Google.

As fotos são recortadas automaticamente para preencher o espaço, então deixe o
rosto/assunto mais ou menos no centro.

---

## 5. Endereço do site (domínio)

Depois de apontar o domínio definitivo na Vercel, troque
`https://www.espanolymate.com.br` em **3 arquivos**:

- `index.html` (aparece 2 vezes, nas linhas de `canonical` e `og:url`)
- `robots.txt`
- `sitemap.xml`

Isso é o que faz o link ficar bonito quando alguém compartilha o site no
WhatsApp ou no Instagram, e ajuda o Google a indexar a página certa.

---

## 6. Ano no rodapé

**Arquivo:** `index.html` — `Professora Betina · 2026`. É um número fixo:
atualize quando virar o ano.

---

## 7. Imagem de compartilhamento (opcional, ainda não existe)

Quando o site é colado no WhatsApp/Instagram/LinkedIn, aparece um cartão com
imagem. Hoje esse cartão sai **sem imagem**, porque ainda não temos uma foto
aprovada. Para ativar:

1. Salve uma imagem de **1200 × 630 pixels** como `assets/img/og-capa.jpg`.
2. No `index.html`, logo abaixo da linha `<meta name="twitter:card" ...>`,
   acrescente:
   `<meta property="og:image" content="https://SEUDOMINIO/assets/img/og-capa.jpg">`

---

## O que NÃO mexer sem falar com o desenvolvedor

- `assets/css/styles.css` — cores, tamanhos e o comportamento no celular.
- `assets/js/main.js` — o menu do celular e os quadros do Instagram.
- `vercel.json` — regras de segurança da publicação.
- `design/` — cópia do design original, guardada como referência.

---

## Textos da página

Todo o texto que aparece no site está dentro do `index.html` e pode ser editado
diretamente — cuidado apenas para não apagar as marcações `<p>`, `<h2>`, etc.

Os depoimentos de alunos ("Marina C." e "Rafael T.") vieram do design de
aprovação. **Confirme se são reais antes de publicar** — se não forem, troque por
depoimentos verdadeiros ou retire a seção.

O parágrafo de apresentação da seção "Sobre" está **genérico de propósito**: não
cita formação, tempo de experiência nem cidade, porque esses dados ainda não
foram confirmados. Reescreva com os dados verdadeiros quando quiser.
