using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class ServiceItem
{
    [Key]
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Href { get; set; }
    public string? Description { get; set; }
    public string? IconName { get; set; }
    public string? Color { get; set; }
    public string? DeliverablesJson { get; set; }
    public string CreatedAt { get; set; } = DateTime.UtcNow.ToString("o");
}

