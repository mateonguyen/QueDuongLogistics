using Backend.Helpers.Params;

namespace Backend.Data.Interfaces;

public interface ITransactionRepository : IBaseRepository<Transaction>
{
    PagedList<TransactionDto> ToList(TransactionParams transactionParams);
    Task<Transaction> SingleAsync(int id);
    Task<string> GenerateTransactioNo(DateTime transactionDate, string customerCode);
}
