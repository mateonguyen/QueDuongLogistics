using System.Threading.Tasks;
using Backend.Entities;

namespace Backend.Data.Interfaces
{
    public interface IRoleRepository : IBaseRepository<AppRole>
    {
        Task<AppRole> GetUserByIdAsync(int id);
    }
}