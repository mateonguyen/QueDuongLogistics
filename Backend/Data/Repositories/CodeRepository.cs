namespace Backend.Data.Repositories;

public class CodeRepository : BaseRepository<AdmCode>, ICodeRepository
{
    private readonly WakDbContext _context;
    private readonly IMapper _mapper;

    public CodeRepository(WakDbContext context, IMapper mapper) : base(context)
    {
        _mapper = mapper;
        _context = context;
    }

    public async Task<IEnumerable<AdmCodeValue>> GetCodeValuesByCode(int codeId)
    {
        return await _context.AdmCodeValues.Where(x => x.CodeId == codeId).ToListAsync();
    }

    public async Task<bool> CodeExists(string name)
    {
        return await _context.AdmCodes.AnyAsync(x => x.Name.ToLower() == name.ToLower());
    }

    public async Task<bool> CodeExists(int id, string name)
    {
        return await _context.AdmCodes.AnyAsync(x => x.Id != id && x.Name.ToLower() == name.ToLower());
    }

    public async Task<AdmCode> GetCodeByIdAsync(int codeId)
    {
        return await _context.AdmCodes.Where(x => x.Id == codeId).SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<CodeDto>> GetCodesAsync()
    {
        return await _context.AdmCodes.ProjectTo<CodeDto>(_mapper.ConfigurationProvider).AsNoTracking().ToListAsync();
    }
}
