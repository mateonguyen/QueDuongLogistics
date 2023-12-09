namespace Backend.Data.Repositories;

public class UserRepository : BaseRepository<AppUser>, IUserRepository
{
    private readonly WakDbContext _context;
    private readonly IMapper _mapper;

    public UserRepository(WakDbContext context, IMapper mapper)
        : base(context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<IEnumerable<UserDto>> GetUsersAsync()
    {
        return await _context.Users.Include(x => x.Group).ProjectTo<UserDto>(_mapper.ConfigurationProvider).AsNoTracking().ToListAsync();
    }

    public async Task<AppUser> GetUserByIdAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<AppUser> GetUserByUsername(string username)
    {
        return await _context.Users.Include(x => x.Group).Where(x => x.UserName == username).SingleOrDefaultAsync();
    }

    // public async Task<PagedList<UserDto>> GetUsersAsync(PaginationParams userParams)
    // {
    //     var source = _context.Users.AsQueryable();

    //     return await PagedList<UserDto>.CreateAsync(
    //         source.ProjectTo<UserDto>(_mapper.ConfigurationProvider).AsNoTracking(),
    //         userParams.PageNumber,
    //         userParams.PageSize
    //     );
    // }

    public async Task<IEnumerable<AppUser>> GetUsersByGroupAsync(int groupId)
    {
        return await _context.Users.Where(x => x.GroupId == groupId).ToListAsync();
    }
}