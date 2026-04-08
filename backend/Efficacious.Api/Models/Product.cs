using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class Product
{
    public int Id { get; set; }

    [Required]
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public string Image { get; set; } = string.Empty;

    public string Link { get; set; } = string.Empty;
}
