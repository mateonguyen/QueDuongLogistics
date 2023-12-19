namespace Backend.Dtos
{
    public class TransactionDetailDto
    {
        public int Id { get; set; }
        [ForeignKey("Transaction")]        
        public int TransactionId { get; set; }
        public int ContType { get; set; }
        public int ContCount { get; set; }
        public int PackageCount { get; set; }        
        public string PackageUnit { get; set; }
        public int Quantity { get; set; }
        public string Unit { get; set; }
        public string GoodsDescription { get; set; }
        public string DeliveredPlace { get; set; }
        public DateTime? DeliveredTime { get; set; }

        public virtual TransactionDto Transaction { get; set; }
    }
}