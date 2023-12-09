using Microsoft.AspNetCore.Http;

namespace Backend.Dtos;

public class AuthDto
{
    public UserDto User { get; set; }

    public string Token { get; set; }
}

public class LoginDto
{
    [Required]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }
}

public class ChangePasswordDto
{
    public string CurrentPassword { get; set; }
    public string Password { get; set; }
}

public class ProfileDto
{
    public int Id { get; set; }

    public string UserName { get; set; }

    public string FullName { get; set; }

    public string Biography { get; set; }

    public IFormFile PhotoFile { get; set; }
}