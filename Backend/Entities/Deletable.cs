namespace Backend.Entities;

public abstract class Deletable
{
    public DateTime? Deleted { get; set; }

    public string DeletedBy { get; set; }

    public bool IsDeleted { get; set; }
}
