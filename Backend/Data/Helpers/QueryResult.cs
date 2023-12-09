namespace Backend.Data.Helpers;

public class QueryResult
{
    public QueryResult()
    {

    }

    public QueryResult Success { get; }

    //
    // Summary:
    //     Flag indicating whether if the operation succeeded or not.
    //
    // Value:
    //     True if the operation succeeded, otherwise false.
    public bool Succeeded { get; protected set; }


}
