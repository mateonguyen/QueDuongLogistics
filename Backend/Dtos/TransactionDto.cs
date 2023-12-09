namespace Backend.Dtos;

public class TransactionDto
{
    public int Id { get; set; }
    public string TransactionNo { get; set; }

    public int CustomerId { get; set; }
    public string CustomerName { get; set; }
    public string CustomerCode { get; set; }
    
    public int VehicleId { get; set; }
    public string TypeOfVehicle { get; set; }
    public string VehicleNumber { get; set; }
    public string CargoBoxSize { get; set; }
    public int PayloadCapacity { get; set; }
    public string PayloadCapacityUnit { get; set; } 

    public int DriverId { get; set; }
    public string DriverName { get; set; }
    
    public string StartPlace { get; set; }
    public string KmStart { get; set; }
    public DateTime TimeStartIn { get; set; }
    public DateTime TimeStartOut { get; set; }
    public string EndPlace { get; set; }
    public string KmEnd { get; set; }
    public DateTime TimeEndIn { get; set; }
    public DateTime TimeEndOut { get; set; }
    public int ReceivedQuantity { get; set; }
    public int DeliveredQuantity { get; set; }
    public char SoR { get; set; }
    public string TranspotrationEntity { get; set; }
  
    public decimal DemurrageFee { get; set; }
    public decimal TransshipmentFee { get; set; }
    public decimal ReturnShippingFee { get; set; }
    public decimal CustomsFee { get; set; }
    public decimal HandlingFee { get; set; }
    public decimal TicketFee { get; set; }
    public decimal OtherFee { get; set; }
}
