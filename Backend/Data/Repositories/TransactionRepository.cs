
using System.Globalization;
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
        if (transactionParams.CustomerId != 0)
        {
            query = query.Where(x => x.CustomerId == transactionParams.CustomerId);
        }

        if (transactionParams.VendorId != 0)
        {
            query = query.Where(x => x.VendorId == transactionParams.VendorId);
        }

        CultureInfo provider = CultureInfo.InvariantCulture;
        if(transactionParams.TransDateFrom != null)
        {
            DateTime startDate = DateTime.ParseExact(transactionParams.TransDateFrom, "yyyyMMdd", provider);
            query = query.Where(x => DateTime.Compare(x.TransactionDate.Date, startDate) >= 0);
        }

        if(transactionParams.TransDateTo != null)
        {
            DateTime endDate = DateTime.ParseExact(transactionParams.TransDateTo, "yyyyMMdd", provider);
            query = query.Where(x => DateTime.Compare(x.TransactionDate.Date, endDate) <= 0);
        }
            
        if (!string.IsNullOrEmpty(transactionParams.Term))
        {
            query = query.Where(delegate (TransactionDto x)
            {
                if ((x.TransactionNo + " " + x.Driver.FullName + " " + x.Vehicle.VehicleNumber + " " + x.Destination + " " + x.Origin).ToUnSign()
                        .IndexOf(transactionParams.Term.ToUnSign(), StringComparison.CurrentCultureIgnoreCase) >= 0)
                    return true;
                else
                    return false;
            }).AsQueryable();
        }

        // Sorting
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
                        .Include(x => x.Vendor)
                        // .Include(x => x.ShippingRoute).ThenInclude(x => x.Origin)
                        // .Include(x => x.ShippingRoute).ThenInclude(x => x.Destination)
                        .Include(x => x.TransactionDetails)
                        .Where(x => x.Id == id).SingleOrDefaultAsync();
    }

    public async Task<string> GenerateTransactioNo(DateTime transactionDate, string customerCode)
    {
        var crnNo = await _context.Transactions.Where(x => x.TransactionDate == transactionDate).MaxAsync(x => x.TransactionNo);
        var today = DateTime.Today.ToString("dd.MM.yy");

        var nextNo = "001";

        if (crnNo != null)
            nextNo = (Convert.ToInt32(crnNo[^3..]) + 1).ToString().PadLeft(3, '0');

        return today + "." + customerCode + "." + nextNo;
    }
}
