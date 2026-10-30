namespace Efficacious.Api.Models;

public class EmailRequest
{
    public string? Type { get; set; } = "contact";
    public string? Product { get; set; }
    public string? Name { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Email { get; set; }
    public string? Mobile { get; set; }
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? SchoolName { get; set; }
    public string? Restaurant { get; set; }
    public string? Company { get; set; }
    public string? Outlets { get; set; }
    public string? StudentCount { get; set; }
    public string? Time { get; set; }
    public string? Details { get; set; }
    public string? Subject { get; set; }
    public string? Position { get; set; }
    public string? Message { get; set; }
    public string? ResumeName { get; set; }
    public string? ResumeSize { get; set; }
    public string? ResumeDataUrl { get; set; }
}

public class EmailResponse
{
    public bool Success { get; set; }
    public string? Message { get; set; }
    public string? Error { get; set; }
}

