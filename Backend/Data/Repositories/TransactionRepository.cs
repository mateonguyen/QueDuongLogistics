
namespace Backend.Data.Repositories;

public class TransactionRepository : BaseRepository<Transaction>, ITransactionRepository
{
    private readonly WakDbContext _context;
    private readonly IMapper _mapper;

    public TransactionRepository(WakDbContext context, IMapper mapper) : base(context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<IEnumerable<TransactionDto>> ToListAsync()
    {
        return await _context.Transactions.Include(x => x.TransactionDetails).ProjectTo<TransactionDto>(_mapper.ConfigurationProvider).AsNoTracking().ToListAsync();
    }

    public async Task<Transaction> SingleAsync(int id)
    {
        return await _context.Transactions.Where(x => x.Id == id).SingleOrDefaultAsync();
    }
}
