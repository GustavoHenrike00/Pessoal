# Smart Life Manager - TODO

## Fase 1: Estrutura Base e Design
- [x] Configurar tema e cores da aplicação
- [x] Criar componentes reutilizáveis (Card, Button, Input, Badge)
- [x] Implementar sistema de navegação com tab bar
- [x] Criar layout base com ScreenContainer
- [x] Gerar logo personalizado do aplicativo
- [x] Atualizar app.config.ts com branding

## Fase 2: Tela Home (Dashboard)
- [x] Implementar saudação dinâmica por hora do dia
- [x] Criar card de próximo evento
- [x] Criar card de próxima tarefa
- [x] Criar card de resumo financeiro
- [x] Implementar botão de acesso rápido
- [x] Adicionar indicador de notificações

## Fase 3: Estrutura de Banco de Dados
- [x] Criar schema com tabelas (eventos, tarefas, transações, notícias, etc)
- [x] Executar migração do banco de dados
- [x] Implementar funções de banco de dados para CRUD

## Fase 4: API tRPC
- [x] Criar rotas tRPC para eventos
- [x] Criar rotas tRPC para tarefas
- [x] Criar rotas tRPC para transações
- [x] Criar rotas tRPC para notícias
- [x] Criar rotas tRPC para configurações de usuário

## Fase 5: Tela Agenda
- [x] Criar interface básica da tela
- [ ] Implementar listagem de eventos
- [ ] Implementar formulário para adicionar evento
- [ ] Implementar sistema de notificações
- [ ] Adicionar integração com WhatsApp (extração manual)
- [ ] Implementar edição/deleção de eventos
- [ ] Configurar alarmes e sons de notificação

## Fase 6: Tela Rotina
- [x] Criar interface básica da tela
- [ ] Implementar listagem de tarefas do dia
- [ ] Implementar formulário para adicionar tarefa
- [ ] Adicionar funcionalidade de marcar como concluído
- [ ] Implementar edição de tarefas
- [ ] Adicionar reordenação de tarefas
- [ ] Criar indicador visual de progresso

## Fase 7: Tela Finanças
- [x] Criar interface básica da tela
- [ ] Implementar upload de arquivo Excel
- [ ] Criar parser para dados do Excel
- [ ] Implementar gráfico de pizza (receitas vs despesas)
- [ ] Implementar gráfico de linha (tendência mensal)
- [ ] Criar lista de transações recentes
- [ ] Implementar resumo numérico
- [ ] Adicionar filtros por período e categoria

## Fase 8: Tela Notícias
- [x] Criar interface básica da tela
- [x] Integrar API de notícias (NewsAPI)
- [x] Implementar abas por categoria (Tecnologia, Economia, Política, Empregos)
- [x] Criar feed de artigos com imagens
- [x] Adicionar funcionalidade de compartilhamento
- [x] Implementar atualização manual de feed (pull-to-refresh)
- [x] Adicionar indicador de fonte

## Fase 9: Integração de Notificações Bancárias
- [ ] Implementar captura de notificações do sistema
- [ ] Criar parser para mensagens bancárias
- [ ] Adicionar extração automática de valores e datas
- [ ] Integrar com seção de finanças

## Fase 10: Persistência e Sincronização
- [ ] Implementar AsyncStorage para dados locais
- [ ] Criar sistema de backup
- [ ] Implementar sincronização automática
- [ ] Adicionar tratamento de erros

## Fase 11: Testes
- [ ] Escrever testes unitários para componentes
- [ ] Testar fluxos principais
- [ ] Validar responsividade
- [ ] Otimizar performance
- [ ] Corrigir bugs identificados

## Fase 12: Entrega
- [x] Gerar logo personalizado
- [x] Atualizar app.config.ts com branding
- [ ] Criar checkpoint final
- [ ] Preparar para publicação


## Fase 10: Personalização de Branding
- [x] Criar novo logo "GH." com tema verde
- [x] Atualizar app.config.ts com nome "Smart Life Gustavo H."
- [x] Personalizar cores do tema (verde primário)
- [x] Implementar tela de onboarding
- [x] Criar tela de perfil do usuário
- [x] Adicionar ícones personalizados para as abas


## Fase 11: Integração com Múltiplas Fontes de Dados
- [x] Implementar calendário visual com seleção de mês
- [x] Criar listagem de eventos por dia com horários
- [x] Implementar barra de busca global
- [ ] Integrar com "Prestar Contas" (finanças)
- [ ] Integrar com "Calendário DT" (agenda)
- [ ] Integrar com "Listas Afazeres" (tarefas)
- [ ] Integrar com "Jornal Geral" (notícias)
- [ ] Criar filtros avançados por categoria
- [ ] Adicionar sincronização com múltiplas fontes


## Fase 12: Melhorias Solicitadas
- [x] Adicionar categorização de eventos por cores e tipos (Trabalho, Pessoal, Urgente, etc)
- [x] Criar botão para visualizar compromissos da semana
- [x] Integrar API de notificações push e vibração para eventos
- [x] Adicionar botão para upload de tabela na tela de rotina
- [x] Adicionar botão para upload de tabela na tela de finanças
- [x] Integrar API confiável de notícias (NewsAPI)
- [x] Implementar bloco de notas secreto com senha nas configurações
- [x] Corrigir todos os botões e funções para funcionarem corretamente
- [x] Testar fluxos completos de cada tela
- [x] Garantir que todos os links funcionem

## Fase 13: Refinamento e Correção CRUD
- [x] Criar formulário modal para adicionar eventos na agenda
- [x] Implementar edição de eventos com persistência
- [x] Implementar deleção de eventos com confirmação
- [x] Criar formulário modal para adicionar tarefas
- [x] Implementar edição de tarefas
- [x] Implementar deleção de tarefas com confirmação
- [x] Criar formulário modal para adicionar transações
- [x] Implementar edição de transações
- [x] Implementar deleção de transações com confirmação
- [x] Implementar bloco de notas secreto com senha (1234)
- [x] Testar todas as operações CRUD


## Fase 14: Integração de Planilha Excel
- [x] Criar parser para ler dados da planilha Excel
- [x] Implementar endpoint de upload de arquivo
- [x] Processar dados de "Ganhos e Gastos"
- [x] Processar dados de "Prestação de Contas"
- [x] Importar transações para o banco de dados
- [x] Criar gráficos de receita vs despesa
- [x] Adicionar visualização de categorias
- [x] Testar importação completa
- [x] Integrar cronograma de rotina semanal
- [x] Criar visualizador de rotina com seleção de dia
