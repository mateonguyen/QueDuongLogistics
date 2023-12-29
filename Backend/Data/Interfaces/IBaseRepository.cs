namespace Backend.Data.Interfaces
{
    public interface IBaseRepository<T> where T : class
    {
        void Create(T entity);

        Task CreateAsync(T entity);

        Task CreateRangeAsync(ICollection<T> entity);

        void Update(T entity);

        void Delete(T entity);
    }
}