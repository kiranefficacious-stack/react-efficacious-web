using System.Data;
using System.Text;
using System.Text.RegularExpressions;
using Efficacious.Api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Efficacious.Api.Controllers;

public class MigrateRequest
{
    public string? TargetConnectionString { get; set; }
    public bool TruncateTargetTables { get; set; } = true;
}

[Route("api/[controller]")]
[Route("[controller]")]
[ApiController]
public class MigrationController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly IWebHostEnvironment _env;

    public MigrationController(AppDbContext context, IConfiguration configuration, IWebHostEnvironment env)
    {
        _context = context;
        _configuration = configuration;
        _env = env;
    }

    [HttpGet("status")]
    public async Task<IActionResult> GetStatus()
    {
        var activeProvider = _configuration["DatabaseProvider"] ?? "Sqlite";
        var isSqlServer = activeProvider.Equals("SqlServer", StringComparison.OrdinalIgnoreCase);

        var tableCounts = new Dictionary<string, int>
        {
            { "AboutContents", await _context.AboutContents.CountAsync() },
            { "AdminUsers", await _context.AdminUsers.CountAsync() },
            { "Blogs", await _context.Blogs.CountAsync() },
            { "CareerApplications", await _context.CareerApplications.CountAsync() },
            { "Careers", await _context.Careers.CountAsync() },
            { "ChatSessions", await _context.ChatSessions.CountAsync() },
            { "ChatbotQas", await _context.ChatbotQas.CountAsync() },
            { "Clients", await _context.Clients.CountAsync() },
            { "CompanyContacts", await _context.CompanyContacts.CountAsync() },
            { "ContactInquiries", await _context.ContactInquiries.CountAsync() },
            { "Galleries", await _context.Galleries.CountAsync() },
            { "NewsArticles", await _context.NewsArticles.CountAsync() },
            { "NewsletterSubscribers", await _context.NewsletterSubscribers.CountAsync() },
            { "Partners", await _context.Partners.CountAsync() },
            { "Portfolios", await _context.Portfolios.CountAsync() },
            { "Products", await _context.Products.CountAsync() },
            { "Services", await _context.Services.CountAsync() },
            { "SystemSettings", await _context.SystemSettings.CountAsync() },
            { "TeamMembers", await _context.TeamMembers.CountAsync() },
            { "Testimonials", await _context.Testimonials.CountAsync() },
            { "WebsiteContents", await _context.WebsiteContents.CountAsync() }
        };

        var configuredSqlServer = _configuration.GetConnectionString("SqlServerConnection") 
            ?? _configuration.GetConnectionString("DefaultConnection");

        return Ok(new
        {
            currentProvider = activeProvider,
            isSqlServerActive = isSqlServer,
            totalTables = tableCounts.Count,
            totalRows = tableCounts.Values.Sum(),
            tables = tableCounts,
            configuredSqlServer = MaskConnectionString(configuredSqlServer)
        });
    }

    [HttpGet("export-sql")]
    public IActionResult DownloadSqlScript()
    {
        var sqlPath = Path.Combine(_env.ContentRootPath, "backend", "Efficacious_SqlServer_Setup.sql");
        if (!System.IO.File.Exists(sqlPath))
        {
            sqlPath = Path.Combine(AppContext.BaseDirectory, "Efficacious_SqlServer_Setup.sql");
        }

        if (!System.IO.File.Exists(sqlPath))
        {
            return NotFound(new { error = "Migration SQL script not found on disk" });
        }

        var content = System.IO.File.ReadAllText(sqlPath);
        return File(Encoding.UTF8.GetBytes(content), "application/sql", "Efficacious_SqlServer_Setup.sql");
    }

    [HttpPost("migrate-to-sqlserver")]
    public async Task<IActionResult> MigrateToSqlServer([FromBody] MigrateRequest request)
    {
        var targetConnStr = !string.IsNullOrWhiteSpace(request.TargetConnectionString)
            ? request.TargetConnectionString
            : _configuration.GetConnectionString("SqlServerConnection") ?? _configuration.GetConnectionString("DefaultConnection");

        if (string.IsNullOrWhiteSpace(targetConnStr) || !targetConnStr.Contains("Server=", StringComparison.OrdinalIgnoreCase))
        {
            return BadRequest(new
            {
                success = false,
                error = "A valid Microsoft SQL Server connection string is required (e.g. 'Server=YOUR_HOST,1433;Database=EfficaciousDb;User Id=...;Password=...;TrustServerCertificate=True;')."
            });
        }

        try
        {
            var sqlPath = Path.Combine(_env.ContentRootPath, "backend", "Efficacious_SqlServer_Setup.sql");
            if (!System.IO.File.Exists(sqlPath))
            {
                sqlPath = Path.Combine(AppContext.BaseDirectory, "Efficacious_SqlServer_Setup.sql");
            }

            if (!System.IO.File.Exists(sqlPath))
            {
                return BadRequest(new { success = false, error = "Efficacious_SqlServer_Setup.sql script not found" });
            }

            var scriptText = await System.IO.File.ReadAllTextAsync(sqlPath);

            await using var sqlConn = new SqlConnection(targetConnStr);
            await sqlConn.OpenAsync();

            var batches = Regex.Split(scriptText, @"^\s*GO\s*$", RegexOptions.Multiline | RegexOptions.IgnoreCase);

            int executedBatches = 0;
            foreach (var batch in batches)
            {
                var trimmed = batch.Trim();
                if (string.IsNullOrWhiteSpace(trimmed)) continue;

                await using var cmd = new SqlCommand(trimmed, sqlConn);
                cmd.CommandTimeout = 120;
                await cmd.ExecuteNonQueryAsync();
                executedBatches++;
            }

            return Ok(new
            {
                success = true,
                message = "All tables and rows successfully migrated from SQLite to Microsoft SQL Server!",
                executedBatches,
                targetServer = sqlConn.DataSource,
                targetDatabase = sqlConn.Database
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new
            {
                success = false,
                error = ex.Message,
                details = ex.InnerException?.Message
            });
        }
    }

    private static string MaskConnectionString(string? conn)
    {
        if (string.IsNullOrWhiteSpace(conn)) return "Not configured";
        return Regex.Replace(conn, "(Password|Pwd)=[^;]*", "Password=******", RegexOptions.IgnoreCase);
    }
}

