using Newtonsoft.Json;
using Backend.Enums;

namespace Backend.Dtos;

public class AuditEntry
{
    public string UserName { get; set; }
    public string EntityName { get; set; }
    public AuditType AuditType { get; set; }
    public Dictionary<string, object> KeyValues { get; } = new Dictionary<string, object>();
    public Dictionary<string, object> OldValues { get; } = new Dictionary<string, object>();
    public Dictionary<string, object> NewValues { get; } = new Dictionary<string, object>();
    public List<string> ChangedColumns { get; } = new List<string>();

    public AuditLog ToAudit()
    {
        var audit = new AuditLog
        {
            UserName = UserName,
            AuditType = AuditType.ToString(),
            EntityName = EntityName,
            AuditTime = DateTime.Now,
            PrimaryKey = JsonConvert.SerializeObject(KeyValues),
            OldValues = OldValues.Count == 0 ? null : JsonConvert.SerializeObject(OldValues),
            NewValues = NewValues.Count == 0 ? null : JsonConvert.SerializeObject(NewValues),
            AffectedFields = ChangedColumns.Count == 0 ? null : JsonConvert.SerializeObject(ChangedColumns)
        };
        return audit;
    }
}
public class AuditForHomeDto
{
    public int Id { get; set; }

    [MaxLength(20)]
    public string UserName { get; set; }

    [MaxLength(20)]
    public string EntityName { get; set; }

    public string AuditType { get; set; }

    public DateTime AuditTime { get; set; }
}
