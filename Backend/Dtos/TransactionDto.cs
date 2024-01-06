namespace Backend.Dtos;

public class TransactionDto
{
    public int Id { get; set; }
    public string TransactionNo { get; set; }
    public DateTime TransactionDate { get; set; }
    public int CustomerId { get; set; }
    public string CustomerName { get; set; }
    public CustomerDto Customer { get; set; }
    public int VehicleId { get; set; }    
    public VehicleDto Vehicle { get; set; }
    public int DriverId { get; set; }
    public DriverDto Driver { get; set; }
    public int ShippingRouteId { get; set; }
    public string RouteName { get; set; }
    public int VendorId { get; set; }
    public string VendorName { get; set; }
    public ICollection<TransactionDetailDto> TransactionDetails { get; set; }
}

public class TransactionForCreationDto
{
    public int Id { get; set; }
    public string TransactionNo { get; set; }
    public DateTime TransactionDate { get; set; }
    public int CustomerId { get; set; }
    public CustomerDto Customer { get; set; }
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

    public bool IsSummitedDoc { get; set; }
    public string DocManager { get; set; }
    public bool IsCustomerReturn { get; set; }
    public string Notes { get; set; }

    public ICollection<TransactionDetailDto> TransactionDetails { get; set; }
}


