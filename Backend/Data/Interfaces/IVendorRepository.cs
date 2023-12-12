namespace Backend.Data.Interfaces;

public interface IVendorRepository : IBaseRepository<Vendor>
{
    Task<IEnumerable<VendorDto>> ToListAsync();
    Task<Vendor> SingleAsync(int id);
    Task<bool> Exists(string vendorCode);
    Task<bool> Exists(int id, string vendorCode);
}
