
namespace Backend.Data.Repositories;

public class CustomerRepository : BaseRepository<Customer>, ICustomerRepository
{
    private readonly WakDbContext _context;
    private readonly IMapper _mapper;

    public CustomerRepository(WakDbContext context, IMapper mapper) : base(context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<bool> IsCustomerCodeExists(string customerCode)
    {
        return await _context.Customers.AnyAsync(x => x.CustomerCode == customerCode.ToUpper());
    }

    public async Task<Customer> SingleAsync(int id)
    {
        return await _context.Customers.Where(x => x.Id == id).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<CustomerDto>> ToListAsync()
    {
        return await _context.Customers.ProjectTo<CustomerDto>(_mapper.ConfigurationProvider).AsNoTracking().ToListAsync();
    }
    
    
}
