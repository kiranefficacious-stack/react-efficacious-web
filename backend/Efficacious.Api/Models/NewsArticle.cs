using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class NewsArticle
{
    [Key]
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Category { get; set; }
    public string? Date { get; set; }
    public string? Excerpt { get; set; }
    public string? Image { get; set; }
    public string? Color { get; set; }
    public string? ContentJson { get; set; }
    public string CreatedAt { get; set; } = DateTime.UtcNow.ToString("o");
}

