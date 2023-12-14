
namespace Backend.Data.Repositories
{
    public class LocationRepository : BaseRepository<Location>, ILocationRepository
    {
        private readonly WakDbContext _context;
        private readonly IMapper _mapper;

        public LocationRepository(WakDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Exists(string locationCode)
        {
            return await _context.Locations.AnyAsync(x => x.LocationCode == locationCode.ToUpper());
        }

        public async Task<bool> Exists(int id, string locationCode)
        {
            return await _context.Locations.AnyAsync(x => x.Id != id && x.LocationCode == locationCode.ToUpper());
        }

        public async Task<Location> SingleAsync(int id)
        {
            return await _context.Locations.Where(x => x.Id == id).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<LocationDto>> ToListAsync()
        {
            return await _context.Locations.ProjectTo<LocationDto>(_mapper.ConfigurationProvider).AsNoTracking().ToListAsync();
        }
    }
}