# Última Semana Maio 26 — Publicação no GitHub Pages

Hospedagem pública das **7 fotos ambientadas** + **7 emails HTML** da campanha. As URLs ficam embutidas nos HTMLs e os emails carregam as fotos direto do GitHub Pages quando enviados via RD Station.

---

## 📁 Conteúdo

```
_publish/
├── photos/                       (3.8 MB · 7 hero photos, 1200px width, ~80% JPEG)
│   ├── e1-hero.jpg               ← fds-lanche-vinho (lanche FDS lifestyle)
│   ├── e2-hero.jpg               ← sm-varias (rack 5 mini tortas top-down)
│   ├── e3-hero.jpg               ← fds-empilhadas (3 mini tortas empilhadas)
│   ├── e4-hero.jpg               ← lifestyle-vinho (mulher + vinho + torta)
│   ├── e5-hero.jpg               ← fds-varias (mãos cortando mini torta)
│   ├── e6-hero.jpg               ← kibe-porn (kibes empilhados ambientado)
│   └── e7-hero.jpg               ← hero-cafe-landscape (mesma do banner site)
├── emails/                       (7 HTMLs prontos pra RD Station)
│   ├── e1-25mai-seg-abertura.html
│   ├── e2-26mai-ter-mini-tortas.html
│   ├── e3-27mai-qua-arte-foods-pela-metade.html
│   ├── e4-28mai-qui-editorial.html
│   ├── e5-29mai-sex-tudo-50off.html
│   ├── e6-30mai-sab-ultima-chance.html
│   └── e7-31mai-dom-encerra-hoje.html
└── README.md (este arquivo)
```

## 🌐 URL base (default — assume username `leonardoffaria` e repo `arte-foods-emails`)

```
https://leonardoffaria.github.io/arte-foods-emails/
```

Cada foto fica em:
```
https://leonardoffaria.github.io/arte-foods-emails/photos/e{1..7}-hero.jpg
```

> Se seu username GitHub for outro ou o nome do repo for diferente, rode:
> ```bash
> BASE_OLD="https://leonardoffaria.github.io/arte-foods-emails"
> BASE_NEW="https://SEU-USER.github.io/SEU-REPO"
> for f in emails/*.html; do sed -i '' "s|$BASE_OLD|$BASE_NEW|g" "$f"; done
> ```

---

## 🚀 Publicação no GitHub Pages — 4 passos

### 1. Criar repo no GitHub (UI ou CLI)

```bash
# via gh CLI (se tiver instalada):
gh repo create arte-foods-emails --public --description "Arte Foods — assets públicos pra campanhas (fotos + email HTMLs)"

# OU criar manualmente em https://github.com/new
# Nome: arte-foods-emails · Visibilidade: Public · Sem README inicial
```

### 2. Inicializar git aqui e fazer push

```bash
cd /Users/leonardoffaria/Desktop/Code/artesaniaalimentos/artefoods/marketing/campanhas/Ultima-Semana-Maio26/_publish

git init -b main
git add photos/ emails/ README.md
git commit -m "Última Semana Maio 26 — hero photos + email HTMLs"
git remote add origin https://github.com/leonardoffaria/arte-foods-emails.git
git push -u origin main
```

### 3. Ativar GitHub Pages

- Acessar `https://github.com/leonardoffaria/arte-foods-emails/settings/pages`
- **Source:** Deploy from branch
- **Branch:** `main` / `/ (root)`
- Save

Aguardar ~1-2 min. URL final será `https://leonardoffaria.github.io/arte-foods-emails/`.

### 4. Validar

```bash
# Conferir uma foto está servindo:
curl -sIL https://leonardoffaria.github.io/arte-foods-emails/photos/e1-hero.jpg | head -3

# Conferir um email está renderizando:
open https://leonardoffaria.github.io/arte-foods-emails/emails/e1-25mai-seg-abertura.html
```

---

## 📨 Disparo via RD Station

1. Abrir `emails/e1-25mai-seg-abertura.html` no editor da RD Station (cola o HTML)
2. Conferir preview — as fotos hero devem carregar do GitHub Pages
3. Agendar conforme cronograma:
   - E1 Seg 25/05 10h · E2 Ter 26/05 10h · E3 Qua 27/05 10h · E4 Qui 28/05 10h · E5 Sex 29/05 10h · E6 Sáb 30/05 10h · E7 Dom 31/05 09h
4. Conferir UTMs nos CTAs (todos com `utm_campaign=ultima-semana-maio26`)

## 🔄 Re-publicar (se trocar foto ou copy)

```bash
cd _publish
# editar foto / email
git add -A && git commit -m "Update: <descrição>"
git push
# Pages atualiza em ~30s
```

---

## ⚙️ Especificações técnicas

**Fotos:**
- Width: 1200px (retina-ready · email exibe @ 600px)
- Format: JPEG quality 82 (~200–900 KB cada)
- Hospedagem: GitHub Pages (CDN free, sem rate limit prático)

**Emails:**
- Container 600px, dark mode tratado, MSO Outlook fallback
- UTMs em todos CTAs (`utm_campaign=ultima-semana-maio26&utm_content=<placement>`)
- Footer pattern Arte Foods (2 colunas + sociais amber + `%unsubscribe%`)
- **Regra 7 do CLAUDE.md:** sem URL/handle como texto visível (apenas em href com UTM)

**Cache busting (se precisar trocar foto após o disparo):**
- GitHub Pages tem cache de até ~10 min em CDN
- Pra force refresh: renomear `e1-hero.jpg` → `e1-hero-v2.jpg` + atualizar HTML

---

## ✅ Checklist antes do primeiro push

- [ ] Confirmou username GitHub = `leonardoffaria`?
- [ ] Confirmou nome do repo = `arte-foods-emails`?
- [ ] Se diferente, rodou o `sed` de substituição da URL base (bloco acima)?
- [ ] Conta GitHub tem Pages habilitado (vem por default em accounts free)?
