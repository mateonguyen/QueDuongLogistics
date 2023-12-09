using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Backend.Data;

public class WakDbContext : IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>,
    AppUserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
{
    private readonly IUserResolverService _currentUser;

    public WakDbContext(DbContextOptions options, IUserResolverService currentUser)
        : base(options)
    {
        this._currentUser = currentUser;
    }

    public DbSet<AppGroup> AppGroups { get; set; }
    public DbSet<AppGroupRole> AppGroupRoles { get; set; }
    public DbSet<AdmCode> AdmCodes { get; set; }
    public DbSet<AdmCodeValue> AdmCodeValues { get; set; }    
    public DbSet<AuditLog> AuditLogs { get;set; }
    public DbSet<Driver> Drivers { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Vehicle> Vehicles { get; set; }
    
    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {        
        // ApplyAuditInformation();

        // OnBeforeSaveChanges();

        return base.SaveChangesAsync(cancellationToken);
    }

    // public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
    // {
    //     // ApplyAuditInformation();

    //     OnBeforeSaveChanges();

    //     return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    // }

    // public override int SaveChanges()
    // {
    //     // ApplyAuditInformation();

    //     OnBeforeSaveChanges();

    //     return base.SaveChanges();
    // }

    // public override int SaveChanges(bool acceptAllChangesOnSuccess)
    // {
        
    //     // ApplyAuditInformation();

    //     OnBeforeSaveChanges();

    //     return base.SaveChanges(acceptAllChangesOnSuccess);
    // }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<AppUser>().ToTable("AppUsers");
        builder.Entity<AppRole>().ToTable("AppRoles");
        builder.Entity<AppUserRole>().ToTable("AppUserRoles");
        builder.Entity<IdentityUserLogin<int>>().ToTable("AppUserLogins");
        builder.Entity<IdentityUserClaim<int>>().ToTable("AppUserClaims");
        builder.Entity<IdentityRoleClaim<int>>().ToTable("AppRoleClaims");
        builder.Entity<IdentityUserToken<int>>().ToTable("AppUserTokens");

        builder.Entity<AppUser>()
            .HasMany(x => x.UserRoles)
            .WithOne(x => x.User)
            .HasForeignKey(x => x.UserId)
            .IsRequired();

        builder.Entity<AppRole>()
            .HasMany(x => x.UserRoles)
            .WithOne(x => x.Role)
            .HasForeignKey(x => x.RoleId)
            .IsRequired();

        builder.Entity<AppGroupRole>(groupRole =>
        {
            groupRole.HasKey(x => new { x.GroupId, x.RoleId });

            groupRole.HasOne(x => x.Group)
                .WithMany(x => x.GroupRoles)
                .HasForeignKey(x => x.GroupId)
                .IsRequired();

            groupRole.HasOne(x => x.Role)
                .WithMany(x => x.GroupRoles)
                .HasForeignKey(x => x.RoleId)
                .IsRequired();
        });
    }

    private void ApplyAuditInformation()
        => this.ChangeTracker.Entries()
            .ToList()
            .ForEach(entry =>
            {
                if (entry.Entity is AuditLog || entry.State == EntityState.Detached || entry.State == EntityState.Unchanged)                
                    return;
                
                if (entry.Entity is AppUser && entry.State == EntityState.Modified)
                    return;

                var auditEntry = new AuditEntry
                {
                    EntityName = entry.Entity.GetType().Name,
                    UserName = this._currentUser.GetUserName()
                };

                foreach (var property in entry.Properties)
                {
                    string propertyName = property.Metadata.Name;
                    if (property.Metadata.IsPrimaryKey())
                    {
                        auditEntry.KeyValues[propertyName] = property.CurrentValue;
                        continue;
                    }

                    // Bo qua truong hop Update AppUser
                    // if (auditEntry.EntityName == "AppUser" && entry.State == EntityState.Modified)
                    //     goto Auditable;

                    // if (auditEntry.EntityName == "LichTrinh")
                    //     goto Auditable;

                    switch (entry.State)
                    {
                        case EntityState.Added:
                            auditEntry.AuditType = Enums.AuditType.Create;
                            auditEntry.NewValues[propertyName] = property.CurrentValue;
                            break;
                        case EntityState.Deleted:
                            auditEntry.AuditType = Enums.AuditType.Delete;
                            auditEntry.OldValues[propertyName] = property.OriginalValue;
                            break;
                        case EntityState.Modified:
                            if (property.IsModified)
                            {
                                auditEntry.AuditType = Enums.AuditType.Update;
                                if (property.OriginalValue != property.CurrentValue)
                                {
                                    auditEntry.ChangedColumns.Add(propertyName);                                
                                    auditEntry.OldValues[propertyName] = property.OriginalValue;
                                    auditEntry.NewValues[propertyName] = property.CurrentValue;
                                }                                
                            }
                            break;
                    }
                }
                
                AuditLogs.Add(auditEntry.ToAudit());

                //Auditable:
                if (entry.Entity is IDeletable deletable)
                {
                    deletable.Deleted = DateTime.Now;
                    deletable.DeletedBy = this._currentUser.GetUserName();
                }
                else if (entry.Entity is IAuditable auditable)
                {
                    if (entry.State == EntityState.Added)
                    {
                        auditable.Created = DateTime.Now;
                        auditable.Creator = this._currentUser.GetUserName();
                    }
                    else if (entry.State == EntityState.Modified)
                    {
                        auditable.Modified = DateTime.Now;
                        auditable.Modifier = this._currentUser.GetUserName();
                    }
                }
            });

}