using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class NewsletterSubscriber
{
    [Key]
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string SubscribedAt { get; set; } = DateTime.UtcNow.ToString("o");
    public int IsActive { get; set; } = 1;
}

