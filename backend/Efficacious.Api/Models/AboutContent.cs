using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class AboutContent
{
    [Key]
    public int Id { get; set; }
    public string? HeroTitle { get; set; }
    public string? HeroSubtitle { get; set; }
    public string? HeroImage { get; set; }
    public string? VisionPointsJson { get; set; }
    public string? MissionPointsJson { get; set; }
    public string? ValuesJson { get; set; }
    public string? StoryHtml { get; set; }
    public string UpdatedAt { get; set; } = DateTime.UtcNow.ToString("o");
}

