namespace Backend.Data.Interfaces;

public interface ITransactionRepository : IBaseRepository<Transaction>
{
    Task<IEnumerable<TransactionDto>> ToListAsync();
    Task<Transaction> SingleAsync(int id);
}
