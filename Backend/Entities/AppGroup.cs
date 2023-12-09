namespace Backend.Entities;

public class AppGroup
{
    [Key]
    // [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string GroupName { get; set; }

    [MaxLength(500)]
    public string Description { get; set; }

    [Required]
    public DateTime Created { get; set; } = DateTime.Now;

    [Required]
    [MaxLength(100)]
    public string Creator { get; set; }

    public DateTime? Modified { get; set; }

    [MaxLength(100)]
    public string Modifier { get; set; }

    public ICollection<AppUser> Users { get; set; }

    public ICollection<AppGroupRole> GroupRoles { get; set; }
}
