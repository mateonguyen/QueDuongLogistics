namespace Backend.Data.Interfaces
{
    public interface IShippingRouteRepository : IBaseRepository<ShippingRoute>
    {
        Task<IEnumerable<ShippingRouteDto>> ToListAsync();
        Task<ShippingRoute> SingleAsync(int id);
        Task<bool> Exists(string routeCode);
        Task<bool> Exists(int id, string routeCode);
    }
}