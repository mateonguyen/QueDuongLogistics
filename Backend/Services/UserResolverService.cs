using System.Security.Claims;

namespace Backend.Services;

public interface IUserResolverService
{
    string GetUserName();
}

public class UserResolverService : IUserResolverService
{
    private readonly IHttpContextAccessor _httpContextAccessor;    

    public UserResolverService(IHttpContextAccessor httpContextAccessor) 
        => this._httpContextAccessor = httpContextAccessor;

    public string GetUserName() 
        => this._httpContextAccessor.HttpContext.User?.Identity?.Name;
}
