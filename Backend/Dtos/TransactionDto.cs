namespace Backend.Dtos;

public class TransactionDto
{
    public int Id { get; set; }
    public string TransactionNo { get; set; }
    public int CustomerId { get; set; }
    public string CustomerName { get; set; }
    public int VehicleId { get; set; }
    public string VehicleName { get; set; }
    public int DriverId { get; set; }
    public string DriverName { get; set; }
    public int ShippingRouteId { get; set; }
    public string RouteName { get; set; }
    public int VendorId { get; set; }
    public string VendorName { get; set; }
}

public class TransactionForCreationDto
{
    public int Id { get; set; }
    public string TransactionNo { get; set; }
    public int CustomerId { get; set; }    
    public int VehicleId { get; set; }    
    public int DriverId { get; set; }    
    public int ShippingRouteId { get; set; }    
    public int VendorId { get; set; }
    public decimal DemurrageFee { get; set; }
    public decimal TransshipmentFee { get; set; }
    public decimal ReturnShippingFee { get; set; }
    public decimal CustomsFee { get; set; }
    public decimal HandlingFee { get; set; }
    public decimal TicketFee { get; set; }
    public decimal OtherFee { get; set; }
    public ICollection<TransactionDetail> TransactionDetails { get; set; }
}


