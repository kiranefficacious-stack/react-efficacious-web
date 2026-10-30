using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class AuditLog
{
    [Key]
    public int Id { get; set; }
    public string Action { get; set; } = string.Empty;
    public string? PerformedBy { get; set; }
    public string? Details { get; set; }
    public string? IpAddress { get; set; }
    public string Timestamp { get; set; } = DateTime.UtcNow.ToString("o");
}

