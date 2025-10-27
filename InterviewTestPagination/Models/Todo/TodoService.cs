using System.Collections.Generic;
using System.Linq;

namespace InterviewTestPagination.Models.Todo {
    /// <summary>
    /// TODO: Implement methods that enable pagination
    /// </summary>
    public class TodoService : IModelService<Todo> {

        private IModelRepository<Todo> _repository = new TodoRepository();

        public IModelRepository<Todo> Repository {
            get { return _repository; }
            set { _repository = value; }
        }

        public PaginatedResult<Todo> ListPaginated(int page, int pageSize, string sortBy = "createdDate", bool descending = true){
            
            //Limites de paginação
            page = page < 1 ? 1 : page;
            pageSize = pageSize < 1 ? 20 : pageSize; 

            var todos = new List<Todo>();

            sortBy = sortBy.ToLower();

            //Ordena de acordo com a propriedade (coluna) escolhida
            if(sortBy == "task") {
                todos = descending ? Repository.All().OrderByDescending(t => t.Task).ToList() : Repository.All().OrderBy(t => t.Task).ToList();
            } else if(sortBy == "id") {
                todos = descending ? Repository.All().OrderByDescending(t => t.Id).ToList() : Repository.All().OrderBy(t => t.Id).ToList();
            }else {
                todos = descending ? Repository.All().OrderByDescending(t => t.CreatedDate).ToList() : Repository.All().OrderBy(t => t.CreatedDate).ToList();
            }

            var paged = pageSize == int.MaxValue ? todos : todos.Skip((page - 1) * pageSize).Take(pageSize);

            //Retorna um objeto com as informações de paginação
            return new PaginatedResult<Todo>(){
                PageNumber = page,
                PageSize = pageSize,
                Count = todos.Count,
                Data = paged
            };

        }

        /// <summary>
        /// Example implementation of List method: lists all entries of type <see cref="Todo"/>
        /// </summary>
        /// <returns></returns>
        /// Não está sendo usado mais
        public IEnumerable<Todo> List(/* parameters */) {
            // invoke Datasource layer
            return Repository.All();
        }
    }
}
