using System.Collections.Generic;
using System.Web.Http;
using InterviewTestPagination.Models;
using InterviewTestPagination.Models.Todo;

namespace InterviewTestPagination.Controllers {
    /// <summary>
    /// 'Rest' controller for the <see cref="Todo"/>
    /// model.
    /// 
    /// TODO: implement the pagination Action
    /// </summary>
    public class TodoController : ApiController {

        // TODO: [low priority] setup DI 
        private readonly IModelService<Todo> _todoService = new TodoService();

        [HttpGet]
        [Route("api/Todo/Paginated")]

        public IHttpActionResult GetPaginated(int page, int pageSize, string sortBy = "CreatedDate", bool descending = true) {
        
            //Se o pageSize for 0, retorna todos (all)
            if(pageSize == 0){
                pageSize = int.MaxValue;
            }

            var result = _todoService.ListPaginated(page, pageSize, sortBy, descending);

            return Ok(result);
            
        }
        
        //Comentado pois não está mais sendo usado
        //public IEnumerable<Todo> Todos(/* parameters  */) {
        //    return _todoService.List();
        //}

    }
}
