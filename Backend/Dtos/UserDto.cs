using System.Net.Http;

namespace Backend.Dtos
{
    public class UserDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Biography { get; set; }
        public byte[] Photo { get; set; }
        public DateTime Created { get; set; }
        public DateTime? LastActive { get; set; }
        public bool IsActived { get; set; }
        public int GroupId { get; set; }
        public string GroupName { get; set; }
    }

    public class UserCreateDto
    {
        public string UserName { get; set; }
        public string FullName { get; set; }
        public int GroupId { get; set; }
        public bool IsActived { get; set; }
    }
}