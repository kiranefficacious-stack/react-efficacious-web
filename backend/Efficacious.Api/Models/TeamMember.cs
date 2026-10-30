using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class TeamMember
{
    [Key]
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string? Image { get; set; }
    public string? Description { get; set; }
    public int OrderIndex { get; set; } = 0;
    public string CreatedAt { get; set; } = DateTime.UtcNow.ToString("o");
}

