
namespace Backend.Data.Repositories;

public class VehicleRepository : BaseRepository<Vehicle>, IVehicleRepository
{
    private readonly WakDbContext _context;
    private readonly IMapper _mapper;

    public VehicleRepository(WakDbContext context, IMapper mapper) : base(context)
    {
            _mapper = mapper;
        _context = context;
    }

    public async Task<bool> Exists(string vehicleNumber)
    {
        return await _context.Vehicles.AnyAsync(x => x.VehicleNumber == vehicleNumber);
    }

    public async Task<bool> Exists(int id, string vehicleNumber)
    {
        return await _context.Vehicles.AnyAsync(x => x.Id != id && x.VehicleNumber == vehicleNumber.ToUpper());
    }

    public async Task<Vehicle> SingleAsync(int id)
    {
        return await _context.Vehicles.Where(x => x.Id == id).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<VehicleDto>> ToListAsync()
    {
        return await _context.Vehicles.ProjectTo<VehicleDto>(_mapper.ConfigurationProvider).AsNoTracking().ToListAsync();
    }
}
