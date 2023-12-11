namespace Backend.Data;

public interface IUnitOfWork
{
    IUserRepository UserRepository { get; }
    IRoleRepository RoleRepository { get; }
    IGroupRepository GroupRepository { get; }
    ICodeRepository CodeRepository { get; }
    ICodeValueRepository CodeValueRepository { get; }
    IAuditRepository AuditRepository { get; }
    ITransactionRepository TransactionRepository { get; }
    IDriverRepository DriverRepository { get; }
    ICustomerRepository CustomerRepository { get; }
    IVehicleRepository VehicleRepository { get; }
    IVendorRepository VendorRepository { get; }

    Task<bool> Complete();
    bool HasChanges();
}

public class UnitOfWork : IUnitOfWork
{
    private readonly WakDbContext _context;
    private readonly IMapper _mapper;
    private readonly RoleManager<AppRole> _roleManager;

    public UnitOfWork(WakDbContext context, IMapper mapper, RoleManager<AppRole> roleManager)
    {
        _roleManager = roleManager;
        _mapper = mapper;
        _context = context;
    }

    public IUserRepository UserRepository => new UserRepository(_context, _mapper);
    public IRoleRepository RoleRepository => new RoleRepository(_context);
    public IGroupRepository GroupRepository => new GroupRepository(_context, _mapper, _roleManager);
    public ICodeRepository CodeRepository => new CodeRepository(_context, _mapper);
    public ICodeValueRepository CodeValueRepository => new CodeValueRepository(_context, _mapper);
    public IAuditRepository AuditRepository => new AuditRepository(_context, _mapper);
    public ITransactionRepository TransactionRepository => new TransactionRepository(_context);
    public IDriverRepository DriverRepository => new DriverRepository(_context, _mapper);
    public ICustomerRepository CustomerRepository => new CustomerRepository(_context, _mapper);
    public IVehicleRepository VehicleRepository => new VehicleRepository(_context, _mapper);
    public IVendorRepository VendorRepository => new VendorRepository(_context, _mapper);

    public async Task<bool> Complete()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public bool HasChanges()
    {
        return _context.ChangeTracker.HasChanges();
    }
}
