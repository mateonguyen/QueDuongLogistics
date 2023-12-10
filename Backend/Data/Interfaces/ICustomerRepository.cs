namespace Backend.Data.Interfaces;

public interface ICustomerRepository : IBaseRepository<Customer>
{
    Task<IEnumerable<CustomerDto>> ToListAsync();
    Task<Customer> SingleAsync(int id);
    Task<bool> CodeExists(string customerCode);
}
