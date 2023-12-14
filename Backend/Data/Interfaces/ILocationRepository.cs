namespace Backend.Data.Interfaces
{
    public interface ILocationRepository : IBaseRepository<Location>
    {
        Task<IEnumerable<LocationDto>> ToListAsync();
        Task<Location> SingleAsync(int id);
        Task<bool> Exists(string locationCode);
        Task<bool> Exists(int id, string locationCode);
    }
}