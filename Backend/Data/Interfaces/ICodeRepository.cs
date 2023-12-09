namespace Backend.Data.Interfaces;

public interface ICodeRepository : IBaseRepository<AdmCode>
{
    Task<IEnumerable<CodeDto>> GetCodesAsync();

    Task<AdmCode> GetCodeByIdAsync(int codeId);

    Task<bool> CodeExists(string name);

    Task<bool> CodeExists(int id, string name);
}
