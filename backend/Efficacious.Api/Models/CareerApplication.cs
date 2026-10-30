namespace Efficacious.Api.Models;

public class CareerApplication
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Mobile { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public string ResumeName { get; set; } = string.Empty;
    public string ResumeSize { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

