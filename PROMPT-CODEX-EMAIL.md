# Prompt Codex — Codar email Arte Foods e publicar no GitHub Pages

> Cole o bloco **PROMPT** abaixo no Codex, dentro do repositório `arte-foods-emails`,
> preenchendo os campos `{{...}}` com os dados da campanha. Anexe/aponte o mockup do email
> e tenha em mãos as imagens do header e do selo (baixadas do Drive).

---

## PROMPT (copie a partir daqui)

Você é um dev front-end. Trabalhe no repositório `arte-foods-emails` (site GitHub Pages,
base pública `https://leonardoffaria.github.io/arte-foods-emails/`). Cada campanha é uma
pasta com `index.html` + imagens. O HTML é colado no RD Station / disparado como e-mail,
então **PRECISA ser email-safe**.

### Tarefa
Criar a pasta `{{slug}}/` com o e-mail da campanha **"{{nome_campanha}}"** e publicar no
GitHub Pages. Use **`tortas/index.html` como molde** (copie e adapte) — ele já traz topbar,
footer, botões e responsividade prontos e testados.

### Dados da campanha
- Slug da pasta: `{{slug}}` (ex.: `mini-pizzas`)
- Subject: `{{assunto}}`
- Preheader (snippet): `{{preheader}}`
- Título do header (o que está na arte): `{{titulo_header}}`
- Corpo (parágrafos): `{{corpo}}`
- Frase de fechamento (se houver): `{{frase_fechamento}}`
- Cupom: código `{{CUPOM}}`, desconto `{{10% OFF / R$X}}`, mínimo `R${{min}}`, validade `{{ate DD/MM}}`
- Imagens fornecidas (baixe do Drive e coloque na pasta): `header.png` (a faixa ilustrada do
  topo, 600px de largura) e `selo.png` (o selo "ganhe X% OFF", com fundo cinza `#E9E7E4`).

### ⚠️ REGRAS EMAIL-SAFE (não quebre — senão o e-mail chega SEM estilo)
Clientes de e-mail (Gmail, RD Station) **descartam** `<style>` no `<head>` e não suportam
CSS moderno. **NÃO USE**: classes de CSS para layout, `flexbox`, `position`, `border-radius`
por classe, `<svg>` inline, `background` por classe. **USE**:
- `<table>` para todo o layout, estilos **inline** em cada elemento;
- `bgcolor="..."` nos `<td>` para cores de fundo (funciona até no Outlook);
- `<img>` para tudo que é ilustração (header, selo, badges);
- `<style>` no head **apenas** com `@media (max-width:600px)` para o mobile.

Tudo que for ilustração da arte (faixa do topo, selo estrelado, formas, folhas) **entra como
imagem PNG**, nunca como CSS/SVG.

### Passo a passo
1. `cp -r tortas {{slug}}` e `cd {{slug}}`.
2. Substitua `header.png` e `selo.png` pelas imagens desta campanha (mesmos nomes).
   - `header.png`: faixa do topo, **600px de largura** (exporte em 2x = 1200px para retina).
   - `selo.png`: o selo com **fundo `#E9E7E4`** (mesmo cinza do bloco do cupom) para a emenda
     ficar invisível. Se o selo for o mesmo "ganhe 10% OFF", pode reaproveitar o de `tortas/`.
3. Em `{{slug}}/index.html`, edite **somente conteúdo** (não mexa na estrutura de tabelas):
   - `<title>`, comentário de subject/preheader e a `<div>` do preheader (texto escondido);
   - os `src` das imagens: troque `tortas/` por `{{slug}}/` em `header.png` e `selo.png`;
   - textos do corpo, o código do cupom (`MINITORTA10` → `{{CUPOM}}`), a linha de validade e a
     frase de fechamento;
   - **todos os links** para: `https://artefoods.com.br/?coupon={{CUPOM}}&utm_source=email&utm_medium=email&utm_campaign={{slug}}&utm_content=<hero|cupom|cta-comprar>`
     (o site aplica o cupom pela URL `?coupon=CODE`).
4. **Cupom — não invente valores.** Use os dados informados acima. Se tiver acesso ao banco
   (Supabase, projeto Arte Foods), confirme na tabela `coupons` (`type`, `value`,
   `min_order_value`, `expires_at`). `type=percentage` → "X% OFF"; `type=fixed` → "R$X".
5. **Preview antes de publicar:** gere um `_preview.html` com os caminhos locais e valide no
   navegador em **desktop e mobile** (o cupom deve empilhar no celular: código+QUERO em cima,
   selo centralizado embaixo). Comando de preview:
   ```bash
   python3 - <<'PY'
   h=open('index.html').read()
   open('_preview.html','w').write(
     h.replace('https://leonardoffaria.github.io/arte-foods-emails/{{slug}}/','')
      .replace('https://leonardoffaria.github.io/arte-foods-emails/assets/','../assets/'))
   PY
   # sirva a raiz do repo e abra http://localhost:8791/{{slug}}/_preview.html
   (cd .. && python3 -m http.server 8791)
   ```
   Apague o `_preview.html` antes de commitar.
6. **Publicar:** `git add {{slug}}/ && git commit -m "feat({{slug}}): email {{nome_campanha}}" && git pull --rebase origin main && git push origin main`.
   O Pages propaga em ~1 min. Confirme com `curl -sI https://leonardoffaria.github.io/arte-foods-emails/{{slug}}/index.html` (deve dar 200).
7. Se atualizar uma imagem depois, suba o sufixo de versão nos `src` (`?v=1` → `?v=2`) para
   furar o cache do proxy de imagem do Gmail.

### Referência de marca (já embutida no molde `tortas/`)
- Cores: coral `#F5484A`, amarelo do header `#F6C63C`, âmbar (texto de botão/OFF) `#FFC94D`,
  chocolate (footer/CTA) `#582F19`, cinza do cupom `#E9E7E4`, texto `#2B1A13`.
- Fontes: `Nunito` (títulos/negrito) e `DM Sans` (corpo), com fallback `Arial` — no e-mail o
  texto cai em Arial (normal); as fontes “bonitas” ficam só nas imagens (header/selo).
- Estrutura fixa do molde: **topbar coral + logo → header (imagem) → corpo → cupom (bloco
  cinza + selo) → validade → [frase] → CTA "COMPRAR AGORA" → footer chocolate**.
- Footer fixo (não alterar): descrição institucional; links Perguntas Frequentes / Privacidade
  e Cookies / Termos de uso / Contato; WhatsApp 11 96190-5468; Televendas 11 4673-1228;
  vendas@artefoods.com.br; botão "NOS SIGA!"; rodapé com `%unsubscribe%`.

### Como gerar `header.png` / `selo.png` se você só tiver o mockup (opcional, avançado)
Se não receber as imagens prontas, dá para renderizá-las a partir de um HTML isolado (veja
`tortas/_render.html` como exemplo) servindo com `python3 -m http.server` e tirando um
screenshot do elemento com Playwright (`scale: 'device'` para retina 2x). Mas o caminho
normal é **receber header e selo já exportados** do designer e só colocá-los na pasta.

## (fim do PROMPT)

---

### Checklist rápido para a analista (fora do Codex)
- [ ] Baixei do Drive o `header.png` (faixa do topo, 600px) e o `selo.png`.
- [ ] Preenchi todos os `{{...}}` no prompt (slug, subject, textos, cupom, validade).
- [ ] Confirmei o código e o valor do cupom com o marketing.
- [ ] Rodei o preview e conferi **desktop + celular**.
- [ ] `git push` feito e a URL `.../{{slug}}/` abre com a arte certa.
- [ ] Enviei um **teste real** (RD Station) para mim antes do disparo em massa.
