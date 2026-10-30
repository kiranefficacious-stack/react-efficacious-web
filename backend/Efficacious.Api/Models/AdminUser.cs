using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class AdminUser
{
    [Key]
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string Role { get; set; } = "Admin";
    public int IsActive { get; set; } = 1;
    public string CreatedAt { get; set; } = DateTime.UtcNow.ToString("o");
    public string? LastLoginAt { get; set; }
}

