using Backend.Helpers.Params;

namespace Backend.Data.Interfaces;

public interface ITransactionRepository : IBaseRepository<Transaction>
{
    PagedList<TransactionDto> ToList(TransactionParams transactionParams);
    Task<Transaction> SingleAsync(int id);
}
