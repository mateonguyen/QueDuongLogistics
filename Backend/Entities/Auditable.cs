namespace Backend.Entities;

public abstract class Auditable : IAuditable
{
    public DateTime Created { get; set; } = DateTime.Now;

    [Required]
    public string Creator { get; set; }

    public DateTime? Modified { get; set; }

    public string Modifier { get; set; }
}
