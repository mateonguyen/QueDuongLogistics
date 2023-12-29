namespace Backend.Entities;

public class TransactionDetail
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public int TransactionId { get; set; }
    
    [MaxLength(50)]
    public string ContType { get; set; }

    public int ContCount { get; set; }

    public int PackageCount { get; set; }

    [MaxLength(30)]
    public string PackageUnit { get; set; }

    public int Quantity { get; set; }
    
    [MaxLength(30)]
    public string Unit { get; set; }
    
    [MaxLength(30)]
    public string GoodsDescription { get; set; }

    [MaxLength(150)]
    public string DeliveredPlace { get; set; }

    public DateTime? DeliveredTime { get; set; }

    // public virtual Transaction Transaction { get; set; }
}
