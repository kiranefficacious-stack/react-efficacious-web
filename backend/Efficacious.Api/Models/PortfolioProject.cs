using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class PortfolioProject
{
    [Key]
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Category { get; set; }
    public string? Image { get; set; }
    public string? Description { get; set; }
    public string? StatsJson { get; set; }
    public string? TagsJson { get; set; }
    public string CreatedAt { get; set; } = DateTime.UtcNow.ToString("o");
}

