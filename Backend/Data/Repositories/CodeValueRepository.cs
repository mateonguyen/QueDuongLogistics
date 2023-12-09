namespace Backend.Data.Repositories;

public class CodeValueRepository : BaseRepository<AdmCodeValue>, ICodeValueRepository
{
    private readonly WakDbContext _context;
    private readonly IMapper _mapper;

    public CodeValueRepository(WakDbContext context, IMapper mapper) : base(context)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<bool> CodeValueExists(int codeId, string value)
    {
        return await _context.AdmCodeValues.AnyAsync(x => x.CodeId == codeId && x.Value.ToLower() == value.ToLower());
    }

    public async Task<bool> CodeValueExists(int id, int codeId, string value)
    {
        return await _context.AdmCodeValues.AnyAsync(x => x.CodeId == codeId && x.Id != id && x.Value.ToLower() == value.ToLower());
    }

    public async Task<AdmCodeValue> GetById(int id)
    {
        return await _context.AdmCodeValues.SingleOrDefaultAsync(x => x.Id == id);
    }

    public async Task<IEnumerable<AdmCodeValue>> GetCodeValuesByCode(string code)
    {
        return await _context.AdmCodeValues.Where(x => x.Code.Name == code).ToListAsync();
    }
}
