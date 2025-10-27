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
  - Fonte de dados em memória simulando um banco real (`TodoRepository.cs`), com 55 tarefas pré-carregadas.  

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

## Overview
- There's a fully operational online asset management system (web system: web browser communicating with web server application). This online system has a datasource
- Management wants you to design an offline system that access the same datasource:
	- the clients have limited timespam access to network connectivity
	- in these moments the clients synchronize their work (the data changes they made, CRUD operations)
	- the synchronization consists of downloading new data (recent changes to the datasource) and uploading their work (pushing changes to the datasource)
	- potentially 2 clients might modify the same data while working in the offline application. Also any online modification could take place after the client has synched their data therefore some sort of conflict resolution strategy should take place
	- the network bandwidth is limited, therefore the amount of data transferred needs to be minimized at all times
	- the offline consists of an app and a back-end application to handle the synchronization with the shared datasource

### High-level infrastructure diagram

![Alt text](https://github.com/controltechnologysolutions/hrquestions/blob/master/assets/exam_infra_diagram.png "High-level infrastructure diagram")

---

## Task
Describe a high level architecture for the offline system described above.
The architecture should span both back-end and front-end parts of the system.
Feel free to use any diagrams you think are necessary to explain the choosen architecture.
If you choose any particular technology to compose a technology stack you should describe what the product does and why it is important that it is used in this scenario

### Assume the following
- Online system design is out of the scope (it is already fully functional and can't be modified)
- The datasource is a SQL Database
- The datasource is composed by a single table: 
	- `Asset(id: long, data: string, rowstamp: timestamp)` 
	- rowstamp value is updated automatically anytime an edit on the record happens
- The only link between the online and offline systems is the datasource
- First time the client accesses the offline app the data is downloaded 
- You are free to use any technology stack you wish but you can't change the technologies already chosen for the datasource's RDBMS or the online system
- Performance and scalability (growing number of clients) are a main concern
