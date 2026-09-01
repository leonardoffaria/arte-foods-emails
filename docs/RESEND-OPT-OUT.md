# Módulo Works + Resend: contrato de opt-out dos emails

Decisão vigente desde 24/07/2026.

## Regra

Todo email de marketing publicado neste repositório deve conter um link visível com o destino exato:

```html
<a href="{{unsubscribe_url}}">Descadastre-se</a>
```

O Módulo Works envia pela API de Emails do Resend. Antes do envio, o Módulo Works substitui esse token por uma URL única do contato. Quando há clique, o CRM:

- atualiza o contato para `unsubscribed`;
- grava a supressão do canal de email;
- registra o evento e impede novos disparos.

O texto e o estilo visual podem variar; o `href` não.

## O que não vale

- `%unsubscribe%` era o token do fluxo legado de RD Station.
- `{{{RESEND_UNSUBSCRIBE_URL}}}` só é processado por Broadcasts/Automations do Resend; este fluxo usa `emails.send`/batch por meio do Módulo Works.
- `mailto:` exige tratamento manual e não remove o contato imediatamente.
- Página de contato ou URL fixa não atualiza o status no CRM.
- `{{LINK_DESCADASTRO_MODULO_WORKS}}` nunca foi um token válido.

## Validação

```bash
node scripts/check-email-opt-out.mjs
```

A checagem roda também no GitHub Actions. O botão comum de teste do Módulo Works substitui o token por `#`, então ele serve apenas para validar o visual. Para validar o clique, envie uma campanha real para uma lista interna antes do disparo em massa.

## Fonte viva do contrato

- `modulo-works/src/lib/crm/resend.ts` — `injectUnsubscribeLink`
- `modulo-works/src/lib/crm/dispatch.ts` — geração da URL individual por contato
- `modulo-works/src/app/api/crm/track/unsubscribe/[token]/route.ts` — gravação do opt-out
- `modulo-works/src/app/api/crm/email/test-send/route.ts` — uso de `#` no teste visual
