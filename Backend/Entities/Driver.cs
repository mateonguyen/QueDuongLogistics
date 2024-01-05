namespace Backend.Entities;

public class Driver : Auditable
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Column(Order = 1)]
    public int Id { get; set; }

    [Column(Order = 2)]
    [MaxLength(150)]
    public string FullName { get; set; }

    [Column(Order = 3)]
    [MaxLength(8)]
    public string DateOfBirth { get; set; }

    [Column(Order = 4)]
    [MaxLength(15)]
    public string PhoneNo { get; set; }

    [Column(Order = 5)]
    [MaxLength(15)]
    public string IdentityCardNo { get; set; }

    [Column(Order = 6)]
    [MaxLength(8)]
    public string IssueDate { get; set; }

    [Column(Order = 7)]
    [MaxLength(100)]
    public string IssuePlace { get; set; }

    [MaxLength(500)]
    public string HomeTown { get; set; }
}
