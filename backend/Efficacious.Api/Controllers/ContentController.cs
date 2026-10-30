using System.Text.Json;
using Efficacious.Api.Data;
using Efficacious.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Efficacious.Api.Controllers;

public class NewsletterDto
{
    public string Email { get; set; } = string.Empty;
}

[Route("api/[controller]")]
[ApiController]
public class ContentController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContentController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllContent()
    {
        var items = await _context.WebsiteContents.ToListAsync();
        var result = new Dictionary<string, object?>();

        foreach (var item in items)
        {
            try
            {
                var parsed = JsonSerializer.Deserialize<JsonElement>(item.DataJson);
                result[item.Key] = parsed;
            }
            catch
            {
                result[item.Key] = item.DataJson;
            }
        }

        return Ok(result);
    }

    [HttpGet("{key}")]
    public async Task<IActionResult> GetContentByKey(string key)
    {
        var item = await _context.WebsiteContents.FindAsync(key);
        if (item == null) return NotFound(new { error = $"Content for key '{key}' not found" });
        return Content(item.DataJson, "application/json");
    }

    [HttpPost("{key}")]
    [HttpPut("{key}")]
    public async Task<IActionResult> SaveContentByKey(string key, [FromBody] JsonElement payload)
    {
        var json = JsonSerializer.Serialize(payload);
        var existing = await _context.WebsiteContents.FindAsync(key);

        if (existing != null)
        {
            existing.DataJson = json;
            existing.UpdatedAt = DateTime.UtcNow;
        }
        else
        {
            _context.WebsiteContents.Add(new WebsiteContent
            {
                Key = key,
                DataJson = json,
                UpdatedAt = DateTime.UtcNow
            });
        }

        await _context.SaveChangesAsync();
        return Ok(new { success = true, key });
    }

    // --- Dedicated Section Tables Endpoints ---

    [HttpGet("table/blogs")]
    public async Task<IActionResult> GetBlogsTable() => Ok(await _context.Blogs.ToListAsync());

    [HttpGet("table/careers")]
    public async Task<IActionResult> GetCareersTable() => Ok(await _context.Careers.ToListAsync());

    [HttpGet("table/galleries")]
    public async Task<IActionResult> GetGalleriesTable() => Ok(await _context.Galleries.ToListAsync());

    [HttpGet("table/contacts")]
    public async Task<IActionResult> GetContactsTable() => Ok(await _context.CompanyContacts.ToListAsync());

    [HttpGet("table/news")]
    public async Task<IActionResult> GetNewsTable() => Ok(await _context.NewsArticles.ToListAsync());

    [HttpGet("table/partners")]
    public async Task<IActionResult> GetPartnersTable() => Ok(await _context.Partners.ToListAsync());

    [HttpGet("table/portfolios")]
    public async Task<IActionResult> GetPortfoliosTable() => Ok(await _context.Portfolios.ToListAsync());

    [HttpGet("table/services")]
    public async Task<IActionResult> GetServicesTable() => Ok(await _context.Services.ToListAsync());

    [HttpGet("table/team")]
    public async Task<IActionResult> GetTeamTable() => Ok(await _context.TeamMembers.OrderBy(t => t.OrderIndex).ToListAsync());

    [HttpGet("table/about")]
    public async Task<IActionResult> GetAboutTable() => Ok(await _context.AboutContents.ToListAsync());

    [HttpGet("table/testimonials")]
    public async Task<IActionResult> GetTestimonialsTable() => Ok(await _context.Testimonials.ToListAsync());

    [HttpGet("table/clients")]
    public async Task<IActionResult> GetClientsTable() => Ok(await _context.Clients.ToListAsync());

    [HttpGet("table/settings")]
    public async Task<IActionResult> GetSystemSettings() => Ok(await _context.SystemSettings.ToListAsync());

    [HttpPost("table/newsletter")]
    public async Task<IActionResult> SubscribeNewsletter([FromBody] NewsletterDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Email)) return BadRequest(new { error = "Email is required" });

        var existing = await _context.NewsletterSubscribers.FirstOrDefaultAsync(s => s.Email == dto.Email.Trim().ToLower());
        if (existing == null)
        {
            _context.NewsletterSubscribers.Add(new NewsletterSubscriber
            {
                Email = dto.Email.Trim().ToLower(),
                SubscribedAt = DateTime.UtcNow.ToString("o"),
                IsActive = 1
            });
            await _context.SaveChangesAsync();
        }
        return Ok(new { success = true, message = "Subscribed successfully" });
    }
}
