# JobMatch ATS

Aplicação web demonstrativa para comparar um currículo com a descrição de uma vaga, identificar palavras-chave e ajudar a organizar o texto do currículo sem inventar experiências ou qualificações.

> **Status:** MVP educacional, executado inteiramente no navegador. A análise é heurística e não representa nem prevê com precisão o resultado de um sistema ATS real.

## Problema que resolve

Pessoas que se candidatam a vagas podem ter dificuldade em perceber se o currículo comunica, de forma clara, as competências e os requisitos relevantes para uma oportunidade. O JobMatch ATS permite comparar os textos, visualizar termos encontrados e não identificados e revisar a apresentação do currículo.

## Funcionalidades

- Campo para colar a descrição da vaga e o currículo.
- Comparação local de palavras-chave com normalização básica de acentos e caixa.
- Pontuação estimada, termos encontrados e termos não identificados.
- Sugestões de revisão e lembrete de integridade profissional.
- Currículo revisado em campo editável, preservando o conteúdo fornecido.
- Copiar texto e exportar/salvar em PDF por meio da impressão do navegador.
- Exemplo demonstrativo para testar rapidamente.
- Layout responsivo para desktop e celular.

## Como executar

Não precisa instalar dependências nem criar conta em um serviço externo.

1. Baixe ou clone este repositório.
2. Abra `index.html` em um navegador atualizado.
3. Clique em **Usar exemplo** para preencher dados fictícios.
4. Clique em **Analisar compatibilidade**.
5. Edite o currículo revisado, se necessário, e clique em **Exportar / salvar em PDF**.

Para uma experiência de desenvolvimento, você também pode abrir a pasta no VS Code e usar uma extensão de servidor local, como Live Server. A aplicação não precisa de servidor para funcionar.

## Como a análise funciona

1. A pessoa cola a descrição da vaga e o texto do currículo.
2. O JavaScript normaliza letras maiúsculas/minúsculas, remove acentos e pontuação e seleciona palavras e expressões relevantes com regras simples.
3. A aplicação verifica quais termos aparecem no currículo e calcula uma pontuação aproximada: termos identificados divididos pelo total de termos selecionados.
4. A interface exibe termos encontrados, termos não identificados e sugestões gerais de revisão.
5. O texto original é apresentado em uma estrutura revisada para que a pessoa possa editar e exportar.

A pontuação é apenas um indicador didático. A extração de palavras-chave pode selecionar termos pouco relevantes e não compreende contexto, senioridade, sinônimos de forma abrangente, nem os critérios proprietários de cada ATS. Não use o resultado como garantia de seleção.

## Regra de integridade

O projeto não cria automaticamente novas experiências, certificações, competências ou resultados. O currículo revisado é baseado no texto fornecido. A pessoa deve confirmar que cada afirmação é verdadeira antes de enviar uma candidatura.

## Mega prompt do projeto

O mega prompt completo está em [`docs/mega-prompt.md`](docs/mega-prompt.md).

## Decisões e refinamentos

- [`docs/decisoes-e-refinamentos.md`](docs/decisoes-e-refinamentos.md): escopo do MVP, escolhas visuais e mudanças previstas.
- [`docs/testes.md`](docs/testes.md): checklist de testes manuais e resultados a registrar.
- [`docs/validacao.md`](docs/validacao.md): hipóteses e plano de validação inicial.

## Tecnologias

- HTML5
- CSS3 (layout responsivo, sem framework)
- JavaScript puro
- Nenhum backend, banco de dados ou chave de API

O desafio menciona shadcn/ui como referência de design system. Como este MVP não usa React nem um processo de build, os componentes visuais foram implementados com HTML e CSS próprios inspirados em padrões de interface limpos e acessíveis. Isso reduz a configuração necessária para quem está começando.

## Limitações e privacidade

- Os textos são processados no navegador; não são enviados a um servidor por este código.
- Não há login, banco de dados, histórico de análises nem integração com IA generativa.
- Não cole informações pessoais sensíveis. O navegador e extensões instaladas estão fora do controle deste projeto.
- A exportação em PDF usa a função de impressão do navegador.
- O cálculo é uma heurística simples, não um serviço profissional de avaliação de candidatos.

## Publicação

Este projeto pode ser hospedado como site estático, por exemplo com GitHub Pages. Depois de ativar a publicação nas configurações do repositório, substitua o marcador abaixo pelo endereço real:

**Aplicação publicada:** `PREENCHER_APOS_PUBLICAR`

**Repositório:** `PREENCHER_COM_URL_DO_REPOSITORIO`

Não informe links fictícios como se já estivessem publicados.

## Próximas melhorias

- Melhorar extração de frases e controle da relevância das palavras-chave.
- Criar testes automatizados e acessibilidade mais completa.
- Implementar exportação DOCX.
- Se houver backend no futuro, projetar autenticação, autorização, proteção de dados e retenção mínima antes de guardar currículos.
- Adicionar testes com pessoas candidatas e registrar feedback real antes de afirmar que o produto foi validado.
