namespace Backend.Entities;

public class AdmCode
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; }

    [MaxLength(256)]
    public string Description { get; set; }

    public DateTime Created { get; set; } = DateTime.Now;

    [MaxLength(100)]
    public string Creator { get; set; }

    public DateTime? Modified { get; set; }

    [MaxLength(100)]
    public string Modifier { get; set; }

    public virtual ICollection<AdmCodeValue> CodeValues { get; set; }
}
