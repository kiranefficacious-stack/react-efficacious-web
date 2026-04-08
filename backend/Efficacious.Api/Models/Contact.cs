using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class Contact
{
    public int Id { get; set; }

    public string Address { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;
    
    // Storing social links as a JSON string or simplified format for now
    public string SocialLinks { get; set; } = string.Empty; 

    public string Website { get; set; } = string.Empty;
}
