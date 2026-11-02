using Efficacious.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Efficacious.Api.Controllers;

public class LoginRequest
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

[Route("[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var email = (request?.Email ?? string.Empty).Trim().ToLowerInvariant();
            var password = (request?.Password ?? string.Empty).Trim();

            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                return Unauthorized(new
                {
                    success = false,
                    error = "Email and password are required."
                });
            }

            // 1. Check SQLite AdminUsers table
            try
            {
                var dbUser = await _context.AdminUsers
                    .FirstOrDefaultAsync(u => u.Email.ToLower() == email && u.IsActive == 1);

                if (dbUser != null)
                {
                    if (dbUser.PasswordHash == password)
                    {
                        try
                        {
                            dbUser.LastLoginAt = DateTime.UtcNow.ToString("o");
                            await _context.SaveChangesAsync();
                        }
                        catch (Exception saveEx)
                        {
                            // Non-critical: allow login even if SQLite DB file has read-only permissions on IIS
                            Console.WriteLine($"[Auth] Notice: Could not update LastLoginAt: {saveEx.Message}");
                        }

                        return Ok(new
                        {
                            success = true,
                            token = Guid.NewGuid().ToString("N"),
                            user = new
                            {
                                uid = dbUser.Id.ToString(),
                                email = dbUser.Email,
                                displayName = dbUser.DisplayName,
                                role = dbUser.Role
                            }
                        });
                    }
                    else
                    {
                        // Explicitly reject when password does not match
                        return Unauthorized(new
                        {
                            success = false,
                            error = "Invalid email or password. Please verify your admin credentials."
                        });
                    }
                }
            }
            catch (Exception dbEx)
            {
                Console.WriteLine($"[Auth] Database user lookup failed, falling back to configuration: {dbEx.Message}");
            }

            // 2. Strict fallback to appsettings.json if database user record is not found or DB has issues
            var configuredEmail = (_configuration["Admin:Email"] ?? "admin@efficacious.co.in").Trim().ToLowerInvariant();
            var configuredPass = (_configuration["Admin:Password"] ?? "Admin@123").Trim();

            if (email == configuredEmail && password == configuredPass)
            {
                return Ok(new
                {
                    success = true,
                    token = Guid.NewGuid().ToString("N"),
                    user = new
                    {
                        uid = "admin_user_01",
                        email = configuredEmail,
                        displayName = "Efficacious Administrator",
                        role = "SuperAdmin"
                    }
                });
            }

            return Unauthorized(new
            {
                success = false,
                error = "Invalid email or password. Please verify your admin credentials."
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[Auth] Critical login error: {ex}");
            return StatusCode(500, new
            {
                success = false,
                error = "Authentication server error: " + ex.Message
            });
        }
    }

    [HttpGet("verify")]
    public IActionResult Verify()
    {
        return Ok(new { status = "active", auth = "ASP.NET Core Admin Auth" });
    }
}
