namespace Backend.Data.Repositories;

public class CustomerRepository : BaseRepository<Customer>, ICustomerRepository
{
    private readonly WakDbContext _context;
    public CustomerRepository(WakDbContext context) : base(context)
    {
        _context = context;
    }
}
