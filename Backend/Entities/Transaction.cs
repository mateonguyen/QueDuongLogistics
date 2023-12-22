namespace Backend.Entities;

public class Transaction : Auditable
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column(Order = 1)]
    public int Id { get; set; }

    [Column(Order = 2)]
    [MaxLength(20)]
    public string TransactionNo { get; set; }

    [Column(Order = 3)]
    [ForeignKey("Customer")]
    public int CustomerId { get; set; }

    [Column(Order = 4)]
    [ForeignKey("Vehicle")]
    public int VehicleId { get; set; }

    [Column(Order = 5)]
    [ForeignKey("Driver")]
    public int DriverId { get; set; }

    [Column(Order = 6)]
    [ForeignKey("Vendor")] 
    public int VendorId { get; set; }

    [Column(Order = 7)]
    [ForeignKey("ShippingRoute")] 
    public int ShippingRouteId { get; set; }
        
    [Column(Order = 18)]
    [Precision(18, 3)]  
    public decimal DemurrageFee { get; set; }

    [Column(Order = 19)]
    [Precision(18, 3)]
    public decimal TransshipmentFee { get; set; }

    [Column(Order = 20)]
    [Precision(18, 3)]
    public decimal ReturnShippingFee { get; set; }

    [Column(Order = 21)]
    [Precision(18, 3)]
    public decimal CustomsFee { get; set; }

    [Column(Order = 22)]
    [Precision(18, 3)]
    public decimal HandlingFee { get; set; }

    [Column(Order = 23)]
    [Precision(18, 3)]
    public decimal TicketFee { get; set; }

    [Column(Order = 24)]
    [Precision(18, 3)]
    public decimal OtherFee { get; set; }

    [Column(Order = 25)]
    public bool IsSummitedDoc { get; set; }

    [MaxLength(100)]
    [Column(Order = 26)]    
    public string DocManager { get; set; }

    [Column(Order = 27)]
    public bool IsCustomerReturn { get; set; }

    [Column(Order = 28)]
    public string Notes { get; set; }

    public virtual Customer Customer { get;set; }
    public virtual Driver Driver { get; set; }
    public virtual Vehicle Vehicle { get; set; }
    public virtual Vendor Vendor { get; set; }
    public virtual ShippingRoute ShippingRoute { get; set; }
    public virtual ICollection<TransactionDetail> TransactionDetails { get; set; }
}
