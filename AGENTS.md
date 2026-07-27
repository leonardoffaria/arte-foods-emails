# Regras do repositório `arte-foods-emails`

Este repositório publica os HTMLs e assets dos emails de marketing da Arte Foods e da Cia da Torta no GitHub Pages. Os disparos atuais são feitos pelo **Módulo Works**, que usa a API de Emails do Resend como provedor.

## Opt-out obrigatório

- Todo HTML de email deve ter um link visível de descadastro com o destino exato:
  ```html
  <a href="{{unsubscribe_url}}">Descadastre-se</a>
  ```
- O estilo pode acompanhar o footer da campanha, mas o `href` não pode ser alterado.
- Nunca usar `%unsubscribe%`, `{{{RESEND_UNSUBSCRIBE_URL}}}`, `mailto:`, página de contato, URL fixa ou placeholder inventado.
- `{{unsubscribe_url}}` é o contrato do Módulo Works. No disparo real, ele troca o token por uma URL individual, atualiza o contato para `unsubscribed` quando há clique e impede novos envios.
- O link literal pode parecer quebrado no GitHub Pages; isso é esperado.

## Antes de entregar ou publicar

1. Rodar `node scripts/check-email-opt-out.mjs`.
2. Confirmar que a saída informa que todos os emails têm opt-out.
3. Fazer o teste visual pelo Módulo Works.
4. Antes do disparo em massa, criar uma campanha real limitada a uma lista interna, clicar em **Descadastre-se** e confirmar a página “Descadastro realizado”.
5. Só então liberar o disparo para a base.

Arquivos HTML que não são emails ficam listados em `.email-opt-out-ignore`. Não adicionar um email nessa lista para contornar a validação.

O botão comum de teste do Módulo Works substitui o token por `#`; por isso, ele não valida o fluxo funcional de descadastro. O teste clicável precisa ser uma campanha real para uma lista interna.

## Decisão registrada

Em 24/07/2026, o placeholder canônico de descadastro do repositório passou a ser `{{unsubscribe_url}}`, conforme a função `injectUnsubscribeLink` do Módulo Works. O envio continua sendo entregue pelo Resend, mas o estado de opt-out é gerenciado pelo CRM do Módulo Works.
