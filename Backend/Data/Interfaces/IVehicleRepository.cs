namespace Backend.Data.Interfaces;

public interface IVehicleRepository : IBaseRepository<Vehicle>
{
    Task<IEnumerable<VehicleDto>> ToListAsync();
    Task<Vehicle> SingleAsync(int id);
    Task<bool> Exists(string vehicleNumber);
    Task<bool> Exists(int id, string vehicleNumber);
}
