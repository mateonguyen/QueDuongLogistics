namespace Backend.Data.Repositories;

public class VendorRepository : BaseRepository<Vendor>, IVendorRepository
{
    private readonly WakDbContext _context;
    private readonly IMapper _mapper;

    public VendorRepository(WakDbContext context, IMapper mapper) : base(context)
    {
        _mapper = mapper;
        _context = context;
    }

    // public async Task<bool> Exists(string vendorCode)
    // {
    //     return await _context.Vendors.AnyAsync(x => x.VendorCode == vendorCode.ToUpper());
    // }

    // public async Task<bool> Exists(int id, string vendorCode)
    // {
    //     return await _context.Vendors.AnyAsync(x => x.Id != id && x.VendorCode == vendorCode.ToUpper());
    // }

    // public async Task<Vendor> SingleAsync(int id)
    // {
    //     return await _context.Vendors.Where(x => x.Id == id).SingleOrDefaultAsync();
    // }

    // public async Task<IEnumerable<VendorDto>> ToListAsync()
    // {
    //     return await _context.Vendors.ProjectTo<VendorDto>(_mapper.ConfigurationProvider).AsNoTracking().ToListAsync();
    // }
}
