namespace Backend.Data.Repositories;

public class AuditRepository : BaseRepository<AuditLog>, IAuditRepository
{
    private readonly WakDbContext _context;
    private readonly IMapper _mapper;

    public AuditRepository(WakDbContext context, IMapper mapper) : base(context)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IEnumerable<AuditForHomeDto>> GetAuditsForHomeAsync()
    {
        return await _context.AuditLogs.ProjectTo<AuditForHomeDto>(_mapper.ConfigurationProvider).AsNoTracking().OrderByDescending(x => x.Id).Take(5).ToListAsync();
    }
}
