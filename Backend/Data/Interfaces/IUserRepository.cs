using System.Threading.Tasks;
using Backend.Dtos;
using Backend.Entities;
using Backend.Helpers;

namespace Backend.Data.Interfaces
{
    public interface IUserRepository : IBaseRepository<AppUser>
    {
        Task<AppUser> GetUserByIdAsync(int id);

        Task<AppUser> GetUserByUsername(string username);

        // Task<PagedList<UserDto>> GetUsersAsync(PaginationParams userParams);

        Task<IEnumerable<UserDto>> GetUsersAsync();

        Task<IEnumerable<AppUser>> GetUsersByGroupAsync(int groupId);
    }
}