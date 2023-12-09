namespace Backend.Entities;

public class AppRole : IdentityRole<int>
{
    [MaxLength(120)]
    public string Description { get; set; }

    public virtual ICollection<AppUserRole> UserRoles { get; set; }

    public virtual ICollection<AppGroupRole> GroupRoles { get; set; }
}