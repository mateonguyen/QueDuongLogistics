namespace Backend.Helpers.Params;

public class DocumentParams
{
    private const int MaxPageSize = 50;
    public int PageNumber { get; set; } = 1;
    private int _pageSize = 15;

    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }

    // Filtering
    public string Term { get; set; }
    public string StartDate { get; set; }
    public string EndDate { get; set; }
    

    // Sorting
    public string SortField { get; set; } = "Id";
    public string SortOrder { get; set; } = "ascend";
}
