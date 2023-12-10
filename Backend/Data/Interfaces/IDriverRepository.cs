namespace Backend.Data.Interfaces;

public interface IDriverRepository : IBaseRepository<Driver>
{
    Task<IEnumerable<DriverDto>> ToListAsync();
    Task<Driver> SingleAsync(int id);    
}
