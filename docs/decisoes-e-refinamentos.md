# Decisões e refinamentos

Este documento descreve decisões tomadas na implementação do MVP. Se o projeto for refinado posteriormente, atualize cada item com o que realmente foi alterado e testado.

## Decisões do MVP

1. **Sem login:** reduz o escopo e permite experimentar a função principal imediatamente.
2. **Processamento no navegador:** evita enviar currículo para um backend nesta versão.
3. **Sem API de IA:** mantém o projeto gratuito e executável sem chaves ou configuração externa.
4. **Pontuação explicável:** baseada em termos selecionados da vaga que também aparecem no currículo. É uma heurística, não um preditor de contratação.
5. **Currículo editável:** o usuário pode revisar o texto antes de exportar.
6. **Exportação por impressão:** usa a função nativa do navegador para salvar como PDF, evitando dependências adicionais.
7. **Exemplo fictício:** facilita testar a aplicação sem usar dados reais.
8. **Interface responsiva:** prioriza uso em desktop e celular.

## Refinamentos incluídos em relação ao escopo inicial

- Mensagens de validação para textos curtos ou vazios.
- Aviso explícito para não inventar qualificações.
- Explicação da fórmula da pontuação no README e na interface.
- Estados vazios para listas de palavras-chave.
- Botão para copiar o currículo revisado.
- Estilo de impressão para gerar um documento mais limpo.
- Aviso para não inserir dados pessoais sensíveis.
- Documentação das limitações e das próximas melhorias.

## O que ainda precisa ser feito antes da entrega final

- Executar o checklist em `testes.md` e registrar os resultados reais.
- Testar em pelo menos um desktop e um celular, se possível.
- Fazer capturas de tela próprias da aplicação funcionando.
- Publicar a aplicação em um serviço de hospedagem estática.
- Criar o repositório público no GitHub e substituir os marcadores no README.
- Validar a ideia com pessoas do público-alvo e documentar feedback real, sem inventar resultados.

## Nota sobre shadcn/ui

O desafio recomenda citar shadcn/ui no mega prompt. Este MVP foi implementado em HTML, CSS e JavaScript puros para não exigir ambiente React ou instalação de pacotes. O visual usa padrões inspirados em componentes modernos; a biblioteca shadcn/ui não está instalada no projeto.
