# Design de Interface - Smart Life Manager

## Visão Geral
Aplicativo multifuncional para gerenciamento de vida pessoal integrado com Excel, notificações bancárias, agenda inteligente, rotina diária e portal de notícias.

## Orientação e Usabilidade
- **Orientação**: Portrait (9:16)
- **Uso**: Uma mão
- **Padrão**: Apple Human Interface Guidelines (HIG) - Feel like a first-party iOS app

---

## Lista de Telas

1. **Home** - Dashboard com resumo do dia
2. **Finanças** - Integração Excel e gráficos de dados
3. **Agenda** - Eventos com integração WhatsApp
4. **Rotina** - Gerenciador de atividades diárias
5. **Notícias** - Feed de notícias (empregos, tecnologia, política, economia)
6. **Configurações** - Preferências e integrações

---

## Conteúdo e Funcionalidade por Tela

### 1. Home (Dashboard)
**Conteúdo Principal:**
- Saudação com hora do dia (Bom dia/tarde/noite)
- Card com próximo evento da agenda
- Card com próxima tarefa da rotina
- Card com resumo financeiro do dia (entradas/saídas)
- Botão de acesso rápido para adicionar evento/tarefa
- Indicador de notificações não lidas

**Funcionalidade:**
- Exibir dados em tempo real
- Navegação rápida para outras seções
- Sincronização com dados do dia

### 2. Finanças
**Conteúdo Principal:**
- Gráfico de pizza (receitas vs despesas)
- Gráfico de linha (tendência mensal)
- Lista de transações recentes
- Botão para importar dados do Excel
- Resumo numérico (total entradas, saídas, saldo)

**Funcionalidade:**
- Upload/sincronização com arquivo Excel
- Visualização de dados em múltiplos formatos
- Captura automática de notificações bancárias
- Filtros por período e categoria

### 3. Agenda
**Conteúdo Principal:**
- Calendário mensal com eventos destacados
- Lista de eventos do dia selecionado
- Formulário para adicionar evento (título, data, hora, descrição)
- Integração com conversas do WhatsApp (extração automática de datas)
- Sistema de notificações (alarme, som, vibração)

**Funcionalidade:**
- Criar eventos manualmente
- Extrair eventos de mensagens WhatsApp
- Notificações configuráveis (1 dia antes, 1 hora antes, no dia)
- Editar/deletar eventos
- Sincronizar com calendário nativo

### 4. Rotina
**Conteúdo Principal:**
- Lista de atividades do dia em ordem cronológica
- Cards com horário, atividade e status (concluído/pendente)
- Botão para adicionar nova atividade
- Opção de editar atividades existentes
- Indicador visual de progresso do dia

**Funcionalidade:**
- Criar atividades com horário
- Marcar como concluído/pendente
- Editar horários e descrições
- Reordenar atividades
- Persistência de dados diários

### 5. Notícias
**Conteúdo Principal:**
- Abas por categoria (Empregos, Tecnologia, Política, Economia)
- Feed de artigos com thumbnail, título e resumo
- Botão de compartilhamento
- Indicador de fonte de notícia

**Funcionalidade:**
- Buscar notícias de múltiplas fontes (APIs de notícias)
- Filtrar por categoria
- Abrir artigo completo em navegador
- Compartilhar notícias
- Atualizar feed manualmente

### 6. Configurações
**Conteúdo Principal:**
- Conexão com Excel (URL/arquivo)
- Integração WhatsApp (permissões)
- Preferências de notificação
- Tema (claro/escuro)
- Sobre o app

**Funcionalidade:**
- Configurar fontes de dados
- Gerenciar permissões
- Personalizar preferências
- Sincronização de dados

---

## Fluxos de Usuário Principais

### Fluxo 1: Visualizar Finanças
1. Usuário toca em "Finanças" na tab bar
2. App exibe gráficos e resumo financeiro
3. Usuário pode fazer upload de arquivo Excel
4. Dados são processados e exibidos em gráficos
5. Usuário visualiza transações recentes

### Fluxo 2: Criar Evento na Agenda
1. Usuário toca em "Agenda" na tab bar
2. Usuário toca em "+" para adicionar evento
3. Preenche formulário (título, data, hora)
4. Confirma e evento é salvo
5. Sistema agenda notificações automáticas
6. Notificações são entregues nos horários configurados

### Fluxo 3: Gerenciar Rotina Diária
1. Usuário toca em "Rotina" na tab bar
2. Visualiza atividades do dia
3. Pode adicionar nova atividade ou editar existentes
4. Marca atividades como concluídas
5. App mostra progresso visual do dia

### Fluxo 4: Ler Notícias
1. Usuário toca em "Notícias" na tab bar
2. Seleciona categoria desejada
3. Scrolleia pelo feed de artigos
4. Toca em artigo para ler completo
5. Pode compartilhar ou voltar ao feed

---

## Escolhas de Cores

### Paleta Principal
- **Primary (Tint)**: `#0066CC` (Azul profissional)
- **Background**: `#FFFFFF` (Branco) / `#0F1419` (Preto) - dark mode
- **Surface**: `#F5F7FA` (Cinza claro) / `#1A1F2E` (Cinza escuro) - dark mode
- **Foreground**: `#1A1A1A` (Preto) / `#FFFFFF` (Branco) - dark mode
- **Muted**: `#666666` (Cinza médio) / `#AAAAAA` (Cinza claro) - dark mode
- **Border**: `#E0E0E0` (Cinza muito claro) / `#333333` (Cinza escuro) - dark mode

### Cores Funcionais
- **Success**: `#22C55E` (Verde) - Atividades concluídas, transações positivas
- **Warning**: `#F59E0B` (Âmbar) - Notificações, alertas
- **Error**: `#EF4444` (Vermelho) - Transações negativas, erros

### Uso de Cores por Seção
- **Finanças**: Verde (entradas), Vermelho (saídas), Azul (saldo)
- **Agenda**: Azul (eventos), Verde (confirmados), Âmbar (próximos)
- **Rotina**: Verde (concluído), Cinza (pendente), Azul (em progresso)
- **Notícias**: Cores variadas por categoria

---

## Componentes Reutilizáveis

1. **Card**: Container com sombra e borda
2. **Button**: Botão primário e secundário
3. **Input**: Campo de texto, data, hora
4. **Chart**: Gráficos de pizza, linha, barra
5. **ListItem**: Item de lista com ícone e ações
6. **Modal**: Diálogo para confirmações
7. **Badge**: Indicador de status
8. **Notification**: Sistema de alertas

---

## Navegação

- **Tab Bar**: 5 abas principais (Home, Finanças, Agenda, Rotina, Notícias)
- **Settings**: Acessível via ícone no header ou menu
- **Modal**: Para criar/editar eventos e tarefas
- **Deep Links**: Para abrir notificações e eventos

---

## Requisitos de Dados

- **Excel**: Upload de arquivo .xlsx com dados financeiros
- **WhatsApp**: Acesso a conversas para extração de datas (via API ou manual)
- **Notificações**: Integração com APIs de notícias
- **Local Storage**: Persistência de eventos, tarefas e preferências
