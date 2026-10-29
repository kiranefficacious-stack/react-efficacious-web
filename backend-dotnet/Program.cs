using Efficacious.Mailer.Models;
using Efficacious.Mailer.Services;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddSingleton<EmailService>();

// Configure CORS for web applications
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowWebsites", policy =>
    {
        policy.SetIsOriginAllowed(origin => true) // Allows all origins, including localhost, Netlify, and GoDaddy
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowWebsites");

// Root Health Check
app.MapGet("/", () => Results.Ok(new
{
    service = "Efficacious Mailer API",
    framework = ".NET 10 (ASP.NET Core)",
    status = "running",
    time = DateTime.UtcNow
}));

// API Status Check
app.MapGet("/api/send-email", () => Results.Ok(new
{
    status = "active",
    service = "Efficacious Mailer API",
    server = ".NET ASP.NET Core",
    message = "Endpoint is online and ready to receive POST submissions."
}));

// POST API Endpoint
app.MapPost("/api/send-email", async ([FromBody] EmailRequest request, EmailService emailService) =>
{
    var result = await emailService.SendEmailAsync(request);
    return result.Success ? Results.Ok(result) : Results.BadRequest(result);
});

// Alias for /send-email
app.MapPost("/send-email", async ([FromBody] EmailRequest request, EmailService emailService) =>
{
    var result = await emailService.SendEmailAsync(request);
    return result.Success ? Results.Ok(result) : Results.BadRequest(result);
});

app.Run();
