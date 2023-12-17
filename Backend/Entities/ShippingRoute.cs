namespace Backend.Entities;

public class ShippingRoute : Auditable
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column(Order = 1)]
    public int Id { get; set; }

    [MaxLength(20)]
    [Column(Order = 2)]
    public string RouteCode { get; set; }

    [ForeignKey("Origin")]
    [Column(Order = 3)]
    public int OriginId { get; set; }

    [ForeignKey("Destination")]
    [Column(Order = 4)]
    public int DestinationId { get; set; }

    public virtual Location Origin { get; set; }
    public virtual Location Destination { get; set; }


}
