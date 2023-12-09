namespace Backend.Data.Repositories;

public class DriverRepository : BaseRepository<Driver>, IDriverRepository
{
    private readonly WakDbContext _context;
    public DriverRepository(WakDbContext context) : base(context)
    {
        _context = context;
    }
}
