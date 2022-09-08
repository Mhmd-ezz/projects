namespace Auth.Controllers.Users
{
    public class SearchResult<T> where T : class
    {
        public int TotalCount { get; set; }
        public T[] Items { get; set; }

        public dynamic Bag { get; set; }
    }
}
