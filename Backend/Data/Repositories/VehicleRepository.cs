namespace Backend.Data.Repositories;

public class VehicleRepository : BaseRepository<Vehicle>, IVehicleRepository
{
    private readonly WakDbContext _context;
    public VehicleRepository(WakDbContext context) : base(context)
    {
        _context = context;
    }
}
