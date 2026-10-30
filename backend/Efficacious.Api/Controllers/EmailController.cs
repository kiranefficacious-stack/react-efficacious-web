using Efficacious.Api.Data;
using Efficacious.Api.Models;
using Efficacious.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Efficacious.Api.Controllers;

[ApiController]
public class EmailController : ControllerBase
{
    private readonly EmailService _emailService;
    private readonly AppDbContext _context;
    private readonly ILogger<EmailController> _logger;

    public EmailController(EmailService emailService, AppDbContext context, ILogger<EmailController> logger)
    {
        _emailService = emailService;
        _context = context;
        _logger = logger;
    }

    [HttpGet("/api/send-email")]
    [HttpGet("/send-email")]
    public IActionResult GetStatus()
    {
        return Ok(new
        {
            status = "active",
            service = "Efficacious Mailer API",
            server = ".NET ASP.NET Core (Efficacious.Api)",
            message = "Endpoint is online and ready to receive POST submissions."
        });
    }

    [HttpGet("/api/inquiries")]
    public async Task<IActionResult> GetInquiries()
    {
        var inquiries = await _context.ContactInquiries.OrderByDescending(i => i.CreatedAt).ToListAsync();
        return Ok(inquiries);
    }

    [HttpGet("/api/careers")]
    public async Task<IActionResult> GetCareerApplications()
    {
        var apps = await _context.CareerApplications.OrderByDescending(a => a.CreatedAt).ToListAsync();
        return Ok(apps);
    }

    [HttpPost("/api/send-email")]
    [HttpPost("/send-email")]
    public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)
    {
        // 1. Save to Database
        try
        {
            var isCareer = string.Equals(request.Type, "career", StringComparison.OrdinalIgnoreCase);
            if (isCareer)
            {
                var app = new CareerApplication
                {
                    Name = request.Name ?? $"{request.FirstName} {request.LastName}".Trim(),
                    Email = request.Email ?? string.Empty,
                    Mobile = request.Mobile ?? request.Phone ?? string.Empty,
                    Address = request.Address ?? request.City ?? string.Empty,
                    Position = request.Position ?? "Open Role",
                    Message = request.Message ?? string.Empty,
                    ResumeName = request.ResumeName ?? string.Empty,
                    ResumeSize = request.ResumeSize ?? string.Empty,
                    CreatedAt = DateTime.UtcNow
                };
                _context.CareerApplications.Add(app);
                await _context.SaveChangesAsync();
            }
            else
            {
                var inquiry = new ContactInquiry
                {
                    Name = request.Name ?? $"{request.FirstName} {request.LastName}".Trim(),
                    Email = request.Email ?? string.Empty,
                    Mobile = request.Mobile ?? request.Phone ?? string.Empty,
                    Address = request.Address ?? request.City ?? string.Empty,
                    Subject = request.Subject ?? (request.Product != null ? $"Inquiry: {request.Product}" : "General Inquiry"),
                    Message = request.Message ?? string.Empty,
                    CreatedAt = DateTime.UtcNow
                };
                _context.ContactInquiries.Add(inquiry);
                await _context.SaveChangesAsync();
            }
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Failed to persist submission to SQLite database, proceeding to send email.");
        }

        // 2. Deliver Email via MailKit
        var result = await _emailService.SendEmailAsync(request);
        return result.Success ? Ok(result) : BadRequest(result);
    }
}
