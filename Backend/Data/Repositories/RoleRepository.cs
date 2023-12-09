namespace Backend.Data.Repositories;

public class RoleRepository : BaseRepository<AppRole>, IRoleRepository
{
    private readonly WakDbContext _context;

    public RoleRepository(WakDbContext context)
        : base(context)
    {
        _context = context;
    }

    public async Task<AppRole> GetUserByIdAsync(int id)
    {
        return await _context.Roles.FindAsync(id);
    }
}