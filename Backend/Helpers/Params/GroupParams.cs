namespace Backend.Helpers.Params;

public class GroupParams : PaginationParams
{
    public string GroupName { get; set; }

    public string Description { get; set; }
}