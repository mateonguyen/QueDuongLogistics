
namespace Backend.Data.Repositories
{
    public class ShippingRouteRepository : BaseRepository<ShippingRoute>, IShippingRouteRepository
    {
        private readonly WakDbContext _context;
        private readonly IMapper _mapper;
        
        public ShippingRouteRepository(WakDbContext context, IMapper mapper) : base(context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<bool> Exists(string routeCode)
        {
            return await _context.ShippingRoutes.AnyAsync(x => x.RouteCode == routeCode.ToUpper());
        }

        public async Task<bool> Exists(int id, string routeCode)
        {
            return await _context.ShippingRoutes.AnyAsync(x => x.Id != id && x.RouteCode == routeCode.ToUpper());
        }

        public async Task<ShippingRoute> SingleAsync(int id)
        {
            return await _context.ShippingRoutes.Where(x => x.Id == id).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<ShippingRouteDto>> ToListAsync()
        {
            return await _context.ShippingRoutes.Include(x => x.Origin).Include(x => x.Destination).ProjectTo<ShippingRouteDto>(_mapper.ConfigurationProvider).AsNoTracking().ToListAsync();
        }
    }
}