using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class Blog
{
    [Key]
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Excerpt { get; set; }
    public string? Category { get; set; }
    public string? Author { get; set; }
    public string? AuthorRole { get; set; }
    public string? Date { get; set; }
    public string? ReadTime { get; set; }
    public string? Image { get; set; }
    public string? Color { get; set; }
    public string? TagsJson { get; set; }
    public string? ContentJson { get; set; }
    public string CreatedAt { get; set; } = DateTime.UtcNow.ToString("o");
}

