namespace Backend.Data.Interfaces;

public interface IAuditRepository : IBaseRepository<AuditLog>
{
    Task<IEnumerable<AuditForHomeDto>> GetAuditsForHomeAsync();
}
