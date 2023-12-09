namespace Backend.Data.Repositories;

public class TransactionRepository : BaseRepository<Transaction>, ITransactionRepository
{
    private readonly WakDbContext _context;

    public TransactionRepository(WakDbContext context) : base(context)
    {
        _context = context;
    }
}
