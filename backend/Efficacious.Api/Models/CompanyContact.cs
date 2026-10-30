using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class CompanyContact
{
    [Key]
    public int Id { get; set; }
    public string? Office { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Website { get; set; }
    public string? SocialsJson { get; set; }
    public string UpdatedAt { get; set; } = DateTime.UtcNow.ToString("o");
}

