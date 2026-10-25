# Mega prompt — JobMatch ATS

## Contexto e objetivo

Crie uma aplicação web chamada **JobMatch ATS** para ajudar pessoas candidatas a comparar o texto de seu currículo com a descrição de uma vaga. O objetivo é facilitar a identificação de palavras-chave e a apresentação clara das experiências que a pessoa realmente possui.

A regra de integridade é obrigatória: **nunca invente ou acrescente experiências, competências, cursos, certificações, empregadores, datas ou resultados que não estejam no currículo fornecido.** Quando faltar um requisito, mostre-o como item a verificar, sem sugerir que a pessoa alegue possuí-lo.

## Público-alvo e problema

Pessoas que estão procurando emprego, estágio ou uma transição de carreira e desejam entender melhor como seu currículo se relaciona com uma vaga específica.

## Escopo do MVP

1. Uma página responsiva, em português brasileiro.
2. Campo de texto para descrição da vaga.
3. Campo de texto para o currículo atual.
4. Botão para analisar compatibilidade e validação de campos vazios.
5. Uma pontuação estimada com explicação de que não garante aprovação em ATS.
6. Lista de palavras-chave encontradas e não identificadas.
7. Sugestões claras de revisão.
8. Campo editável com a versão revisada do currículo, usando somente o conteúdo fornecido.
9. Ação para copiar o texto e opção de imprimir/salvar em PDF.
10. Um exemplo fictício para experimentar a ferramenta.
11. Aviso de privacidade: não inserir dados pessoais sensíveis; na versão MVP, processamento local.
12. Estados vazios, mensagens de erro úteis e layout para celular e desktop.

Não construir login, dashboard, banco de dados, cobrança, integração com WhatsApp nem serviços de IA externos nesta primeira versão.

## Fluxo do usuário

1. A pessoa abre a página e entende o propósito.
2. Cola a descrição da vaga e seu currículo.
3. Aciona a análise.
4. Vê a pontuação estimada, as palavras-chave encontradas e os termos não identificados.
5. Lê sugestões e confere se os termos pendentes representam competências que realmente possui.
6. Revisa o texto editável, corrige qualquer erro e exporta por impressão em PDF.

## Lógica da análise

- Normalizar caixa, acentos e pontuação.
- Identificar palavras e expressões relevantes na descrição da vaga.
- Comparar os termos com o texto do currículo.
- Exibir o cálculo de forma transparente: quantidade de termos identificados dividida pela quantidade de termos selecionados.
- Não afirmar que o cálculo reproduz o algoritmo de um ATS real.
- Não transformar termos ausentes em afirmações no currículo final.
- Se a análise não conseguir identificar termos, informar isso com clareza.

## Design system e identidade visual

Use **shadcn/ui** como referência de padrões de componentes: cartões, botões, campos de formulário, badges, mensagens de estado, hierarquia tipográfica e foco acessível. Se a implementação não usar React, recrie esses padrões em HTML e CSS sem alegar que a biblioteca shadcn/ui foi instalada.

Paleta:
- Roxo principal: `#6D4AFF`
- Roxo escuro: `#4F32D7`
- Fundo: `#FAF9FD`
- Branco: `#FFFFFF`
- Texto principal: `#211D35`
- Texto secundário: `#716D83`
- Borda: `#E9E6F2`
- Verde para termos encontrados: `#18865B`
- Laranja para itens não identificados: `#A86412`

Estilo visual: profissional, calmo, moderno, espaçamento generoso, cartões com bordas suaves, cantos arredondados, sombras discretas e boa legibilidade. Evitar excesso de gradientes e animações.

## Acessibilidade e qualidade

- Usar HTML semântico e rótulos explícitos nos campos.
- Garantir navegação por teclado e foco visível.
- Usar contraste legível.
- Não comunicar estados apenas por cor.
- Garantir layout responsivo.
- Não inserir chaves de API ou segredos no frontend.
- Não persistir currículo sem consentimento.
- Criar mensagens de erro específicas e úteis.

## Critérios de aceitação

- Uma pessoa consegue testar o fluxo sem conta.
- Campos obrigatórios são validados.
- A pontuação e as listas refletem os textos inseridos.
- O currículo final permanece editável.
- A exportação/impressão não inclui elementos desnecessários da interface.
- A aplicação informa claramente as limitações da pontuação.
- Nenhum conteúdo profissional é inventado.
- O projeto pode ser executado sem serviços pagos ou segredos.
