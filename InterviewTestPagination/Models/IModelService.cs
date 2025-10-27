using System.Collections.Generic;
using InterviewTestPagination.Models;

namespace InterviewTestPagination.Models {
    /// <summary>
    /// Model Service layer's main entry-point. 
    /// Should translate high-level commands and data structures into something that can be used by the data source layer.
    /// TODO: create appropriate method signatures
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IModelService<T> {

        /// <summary>
        /// Reference to Repository layer
        /// </summary>
        IModelRepository<T> Repository { get; set; }

        /// <summary>
        /// Example signature of a method that lists entries of model T
        /// </summary>
        /// <returns></returns>
        IEnumerable<T> List(/* parameters */);

        PaginatedResult<T> ListPaginated(int page, int pageSize, string sortBy = "createdDate", bool descending = true); // TODO: implement>
    }

}
