# AGENTS.md

Calculadora React (Vite 6, JavaScript puro, sem TypeScript). App único, sem backend.

## Comandos

- `npm run dev` — dev server com HMR
- `npm run build` / `npm run preview` — build de produção / servir o build

Não há testes, linter nem typecheck configurados — o README (template do Vite) menciona ESLint, mas não existe config de ESLint no repo. Não tente `npm test` ou `npm run lint`.

## Convenções do código

- Nomes em português: componentes (`Botao`, `Display`), funções (`somar`, `subtrair`), variáveis. Seguir esse padrão em código novo.
- Calculadora incompleta por design: multiplicação/divisão não implementadas (TODOs em `src/utils/operacoes.js` e `src/App.jsx` — operator `*`/`/` cai no `default` do `switch`, que apenas devolve `b`). Ao adicionar, atualizar `OPERADORES`, `calcular()` e o CSS do teclado.
- Estilização em um único arquivo: `src/index.css` (classes como `.calculadora`, `.teclado`, tipos de botão via prop `tipo`).

## Estrutura

- `src/main.jsx` → monta `<App />` (`index.html` aponta para ele)
- Lógica de cálculo isolada em `src/utils/operacoes.js` — funções puras; colocar novas operações ali, não no componente

- Comente o código em português.
