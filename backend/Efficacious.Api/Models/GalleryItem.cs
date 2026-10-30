using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class GalleryItem
{
    [Key]
    public int Id { get; set; }
    public string? Caption { get; set; }
    public string? Category { get; set; }
    public string Url { get; set; } = string.Empty;
    public int IsActive { get; set; } = 1;
    public string CreatedAt { get; set; } = DateTime.UtcNow.ToString("o");
}

