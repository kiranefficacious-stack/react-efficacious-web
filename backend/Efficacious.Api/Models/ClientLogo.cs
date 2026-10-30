using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class ClientLogo
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Category { get; set; }
    public string Logo { get; set; } = string.Empty;
    public string CreatedAt { get; set; } = DateTime.UtcNow.ToString("o");
}

