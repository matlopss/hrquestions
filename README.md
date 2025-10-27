# Interview Exam: Paginated Todo List

## Descrição
Este repositório contém a implementação de um sistema de lista de tarefas (**Todo List**) com paginação, desenvolvido como parte de um teste técnico.  
O projeto foi construído utilizando **AngularJS 1.4.8** no front-end e **.NET Framework 4.6 Web API 2** no back-end.

A aplicação exibe uma lista de tarefas com suporte a **paginação, ordenação e seleção dinâmica de quantidade de itens por página**, comunicando-se com a API via requisições RESTful.

---

## Funcionalidades Implementadas

### Back-end (.NET)
- **API Paginada:**  
  Implementado o endpoint `/api/Todo/Paginated`, responsável por retornar os dados de forma paginada através do objeto `PaginatedResult<Todo>` contendo:
  - Página atual (`pageNumber`)
  - Tamanho da página (`pageSize`)
  - Total de itens (`count`)
  - Lista de dados (`data`)
  
- **Serviço e Repositório:**  
  - Lógica de paginação e ordenação implementadas em `TodoService.cs`.
    
- **Ordenação:**  
  Suporte à ordenação por `Id`, `Task` e `CreatedDate`, com alternância entre ascendente e descendente.

---

### Front-end (AngularJS)
- **Diretiva `todoPaginatedList`:**  
  Responsável por renderizar a tabela de tarefas e comunicar-se com a API.  
  Inclui:
  - Exibição dos dados da página atual  
  - Ordenação clicável nas colunas  
  - Indicador de carregamento  
  - Integração direta com o componente de paginação

- **Diretiva `pagination`:**  
  Componente **reutilizável**, responsável pelos controles de paginação:  
  - Navegação (primeira, última, próxima, anterior e entrada manual de página)  
  - Seleção de quantidade de itens por página (10 / 20 / 30 / todos)  
  - Exibição do total de itens e páginas  

- **Comunicação AngularJS ↔ API:**  
  A interação ocorre via `$http.get` no endpoint `/api/Todo/Paginated`, enviando parâmetros de página, tamanho, campo de ordenação e direção.

---

### Estrutura
```
├───InterviewTestPagination
│   │
|   |───index.html ## application's single page
|   |
│   ├───app # angular app folder
│   │   │   app.module.js  ## angular app module definition
│   │   │   main.js        ## angular app code (all components are here, feel free to modularize if you want)
│   │   │
│   │   ├───styles
│   │   │       styles.css ## application's single stylesheet
│   │   │
│   │   └───templates
│   │           pagination.html          ## pagination directive's template
│   │           todo.list.paginated.html ## Todo list's directive's template
│   │
│   ├───App_Start
│   │       WebApiConfig.cs
│   │
│   ├───Controllers
│   │       TodoController.cs ## WebApi controller for the Todo Model
│   │
│   ├───Models  ## Model api
│   │   │   PaginatedResult.cs 
│   │   │   IModelRepository.cs 
│   │   │   IModelService.cs
│   │   │
│   │   └───Todo ## Todo Model specific implementations
│   │           Todo.cs
│   │           TodoRepository.cs
│   │           TodoService.cs
|   |
│   └───Scripts ## third-party scripts (just angular for now)
|
├───InterviewTestPagination.Tests
```

# Architecture Question: Offline asset management system

### **Como o sistema irá funcionar**
A arquitetura funcionaria em três partes:

#### 1. **Aplicativo Offline**
- Funciona no navegador como PWA
- Armazena uma cópia local dos dados utilizando IndexedDB.
- Permite realizar operações CRUD mesmo sem conexão
- Quando a conexão volta, ele envia as alterações feitas e baixa os dados atualizados do servidor.

---

#### 2. **Servidor de Sincronização**
- É uma **API intermediária** que faz a ponte entre o aplicativo offline e o banco de dados online.  
- Quando o usuário se conecta, ela:
  - Recebe as alterações feitas localmente;
  - Compara com a versão atual do banco;
  - Resolve conflitos utilizando o rowstamp como base;
  - Retorna para o cliente os dados novos ou alterados que ele ainda não tinha.

---

#### 3. **Banco de Dados Online**
- Mantém todos os dados originais e o campo rowstamp, que é atualizado automaticamente toda vez que algo muda.  
- O rowstamp é usado para saber o que foi modificado desde o último sincronismo.

---

### **Fluxo de Uso**
- No primeiro acesso usuário baixa todos os dados disponíveis do banco
- Ele pode continuar criando ou alterando os dados localmente
- Ao retornar a conexão o app envia as alterações e recebe as atualizações do servidor
- O servidor comparar as versões e resolve os conflitos se existirem
- No final ocorre a atualização onde o cliente e o banco ficam sincronizados

---

### **Stack Utilizada**

- Front-end: React(PWA) + IndexedDB
- Back-end: .NET Web API + SQL

