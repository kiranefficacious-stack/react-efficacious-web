using Efficacious.Api.Models;
using Efficacious.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Efficacious.Api.Controllers;

[ApiController]
public class EmailController : ControllerBase
{
    private readonly EmailService _emailService;

    public EmailController(EmailService emailService)
    {
        _emailService = emailService;
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

    [HttpPost("/api/send-email")]
    [HttpPost("/send-email")]
    public async Task<IActionResult> SendEmail([FromBody] EmailRequest request)
    {
        var result = await _emailService.SendEmailAsync(request);
        return result.Success ? Ok(result) : BadRequest(result);
    }
}

