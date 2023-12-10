
namespace Backend.Data.Repositories;

public class DriverRepository : BaseRepository<Driver>, IDriverRepository
{
    private readonly WakDbContext _context;
        private readonly IMapper _mapper;
    public DriverRepository(WakDbContext context, IMapper mapper) : base(context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<Driver> SingleAsync(int id)
    {
        return await _context.Drivers.Where(x => x.Id == id).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<DriverDto>> ToListAsync()
    {
        return await _context.Drivers.ProjectTo<DriverDto>(_mapper.ConfigurationProvider).AsNoTracking().ToListAsync();
    }
}
