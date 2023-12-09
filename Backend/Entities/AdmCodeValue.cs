namespace Backend.Entities;

public class AdmCodeValue
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int CodeId { get; set; }

    [Required]
    [MaxLength(250)]
    public string Value { get; set; }

    [MaxLength(250)]
    public string Description { get; set; }

    public int Ordinal { get; set; } = 0;

    public DateTime Created { get; set; } = DateTime.Now;

    [MaxLength(100)]
    public string Creator { get; set; }

    public DateTime? Modified { get; set; }

    [MaxLength(100)]
    public string Modifier { get; set; }

    public virtual AdmCode Code { get; set; }
}