namespace Backend.Data.Interfaces;

public interface ICodeValueRepository : IBaseRepository<AdmCodeValue>
{
    Task<IEnumerable<AdmCodeValue>> GetCodeValuesByCode(string code);

    Task<AdmCodeValue> GetById(int id);

    Task<bool> CodeValueExists(int codeId, string value);

    Task<bool> CodeValueExists(int id, int codeId, string value);
}
