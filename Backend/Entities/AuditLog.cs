namespace Backend.Entities;

public class AuditLog
{
    [Key]
    public int Id { get; set; }

    [MaxLength(20)]
    public string UserName { get; set; }

    [MaxLength(20)]
    public string EntityName { get; set; }

    public string AuditType { get; set; }

    public DateTime AuditTime { get; set; }

    public string OldValues { get; set; }

    public string NewValues { get; set; }

    public string AffectedFields { get; set; }

    public string PrimaryKey { get; set; }

    [MaxLength(20)]
    public string IpAddress { get; set; }
}
