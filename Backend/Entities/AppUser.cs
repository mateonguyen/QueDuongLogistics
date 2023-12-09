namespace Backend.Entities;

public class AppUser : IdentityUser<int>
{
    [MaxLength(100)]
    public string FullName { get; set; }

    public byte[] Photo { get; set; }

    public DateTime Created { get; set; } = DateTime.Now;

    public DateTime LastActive { get; set; } = DateTime.Now;

    public bool IsActived { get; set; }

    public int? GroupId { get; set; }

    public AppGroup Group { get; set; }

    public ICollection<AppUserRole> UserRoles { get; set; }
}
