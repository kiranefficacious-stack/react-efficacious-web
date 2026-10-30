using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class WebsiteContent
{
    [Key]
    public string Key { get; set; } = string.Empty;
    public string DataJson { get; set; } = string.Empty;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

