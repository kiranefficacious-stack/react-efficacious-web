using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class Testimonial
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Role { get; set; }
    public string? Company { get; set; }
    public string Text { get; set; } = string.Empty;
    public string? Image { get; set; }
    public int Rating { get; set; } = 5;
    public string CreatedAt { get; set; } = DateTime.UtcNow.ToString("o");
}

