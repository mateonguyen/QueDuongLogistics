namespace Backend.Data.Repositories;

public class BaseRepository<T> : IBaseRepository<T> where T : class
{
    private readonly WakDbContext _context;

    public BaseRepository(WakDbContext context)
    {
        _context = context;
    }

    public void Create(T entity)
    {
        _context.AddAsync(entity);
    }

    public async Task CreateAsync(T entity)
    {
        await _context.AddAsync(entity);
    }

    public void Delete(T entity)
    {
        _context.Remove(entity);
    }

    public void Update(T entity)
    {
        _context.Update(entity);
    }
}