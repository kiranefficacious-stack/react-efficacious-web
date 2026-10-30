using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class Partner
{
    [Key]
    public int Id { get; set; }
    public string? Region { get; set; }
    public string? Name { get; set; }
    public string? Address { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Color { get; set; }
    public string CreatedAt { get; set; } = DateTime.UtcNow.ToString("o");
}

