namespace Backend.Helpers.Params;

public class TransactionParams
{
    private const int MaxPageSize = 50;
    public int PageNumber { get; set; } = 1;
    private int _pageSize = 30;
    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }
     // Filtering
    public string Term { get; set; }
    public string TransDateFrom { get; set; }
    public string TransDateTo { get; set; }
    public int? CustomerId { get; set; }
    public int? VendorId { get; set; }

    // Sorting
    public string SortField { get; set; } = "Id";
    public string SortOrder { get; set; } = "descend";
}
