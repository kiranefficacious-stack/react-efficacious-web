using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class SystemSetting
{
    [Key]
    public string Key { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string UpdatedAt { get; set; } = DateTime.UtcNow.ToString("o");
}

