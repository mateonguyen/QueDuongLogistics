
using Backend.Helpers.Params;

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

    public PagedList<TransactionDto> ToList(TransactionParams transactionParams)
    {
        var query = _context.Transactions
                        .Include(x => x.Customer)
                        .Include(x => x.Driver)
                        .Include(x => x.Vehicle)
                        .Include(x => x.ShippingRoute)
                        .ProjectTo<TransactionDto>(_mapper.ConfigurationProvider).AsNoTracking();

        // Filtering
        // if (!string.IsNullOrEmpty(transactionParams.Term))
        //     {
        //         query = query.Where(delegate (TransactionDto x)
        //         {
        //             if ((x.TransactionNo + " " + x.CapCho).ToUnSign()
        //                     .IndexOf(transactionParams.Term.ToUnSign(), StringComparison.CurrentCultureIgnoreCase) >= 0)
        //                 return true;
        //             else
        //                 return false;
        //         }).AsQueryable();
            // }

        if (!string.IsNullOrEmpty(transactionParams.SortField))
        {
            if (transactionParams.SortOrder == "ascend")
                query = query.OrderByProperty(transactionParams.SortField);
            else
                query = query.OrderByPropertyDescending(transactionParams.SortField);
        }
        return PagedList<TransactionDto>.Create(query, transactionParams.PageNumber, transactionParams.PageSize);
    }

    public async Task<Transaction> SingleAsync(int id)
    {
        return await _context.Transactions
                        .Include(x => x.Customer)
                        .Include(x => x.Driver)
                        .Include(x => x.Vehicle)
                        .Include(x => x.ShippingRoute).ThenInclude(x => x.Origin)
                        .Include(x => x.ShippingRoute).ThenInclude(x => x.Destination)
                        .Include(x => x.TransactionDetails)
                        .Where(x => x.Id == id).SingleOrDefaultAsync();
    }
}
