namespace Backend.Entities;

public class TransactionDetail
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public int TransactionId { get; set; }

    public int ContType { get; set; }

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
    [ForeignKey("DeliveredPlace")]
    public int DeliveredPlaceId { get; set; }

    public DateTime? DeliveredTime { get; set; }

    public virtual Transaction Transaction { get; set; }
    public virtual Location DeliveredPlace { get; set; }
}
