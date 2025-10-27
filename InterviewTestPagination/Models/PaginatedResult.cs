using System.Collections.Generic;

namespace InterviewTestPagination.Models{
    public class PaginatedResult<T>{

        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int Count { get; set; }
        public IEnumerable<T> Data { get; set; }

    }
}