using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class Career
{
    [Key]
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Department { get; set; }
    public string? Type { get; set; }
    public string? Experience { get; set; }
    public string? Location { get; set; }
    public string? Description { get; set; }
    public string? CriteriaJson { get; set; }
    public string CreatedAt { get; set; } = DateTime.UtcNow.ToString("o");
}

