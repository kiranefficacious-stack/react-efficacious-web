using System.Text.Json;
using Efficacious.Api.Data;
using Efficacious.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Efficacious.Api.Controllers;

public class ChatMessageDto
{
    public string? Text { get; set; }
    public string? Sender { get; set; } // 'user' | 'bot' | 'admin'
    public string? UserName { get; set; }
    public string? UserEmail { get; set; }
    public string? UserMobile { get; set; }
}

public class UpdateSessionDto
{
    public string? Status { get; set; }
    public bool? AdminJoined { get; set; }
    public int? UnreadAdmin { get; set; }
    public int? UnreadUser { get; set; }
}

public class QaItemDto
{
    public string QuestionKeywords { get; set; } = string.Empty;
    public string AnswerText { get; set; } = string.Empty;
}

[Route("api/[controller]")]
[ApiController]
public class ChatController : ControllerBase
{
    private readonly AppDbContext _context;

    public ChatController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("sessions")]
    public async Task<IActionResult> GetSessions()
    {
        var sessions = await _context.ChatSessions
            .Where(s => s.Status != "deleted")
            .OrderByDescending(s => s.LastMessageTime)
            .ToListAsync();
        return Ok(sessions);
    }

    [HttpGet("sessions/{sessionId}")]
    public async Task<IActionResult> GetSession(string sessionId)
    {
        var session = await _context.ChatSessions.FindAsync(sessionId);
        if (session == null) return NotFound();
        return Ok(session);
    }

    [HttpPatch("sessions/{sessionId}")]
    public async Task<IActionResult> UpdateSession(string sessionId, [FromBody] UpdateSessionDto dto)
    {
        var session = await _context.ChatSessions.FindAsync(sessionId);
        if (session == null) return NotFound();

        if (dto.Status != null) session.Status = dto.Status;
        if (dto.AdminJoined.HasValue) session.AdminJoined = dto.AdminJoined.Value;
        if (dto.UnreadAdmin.HasValue) session.UnreadAdmin = dto.UnreadAdmin.Value;
        if (dto.UnreadUser.HasValue) session.UnreadUser = dto.UnreadUser.Value;

        await _context.SaveChangesAsync();
        return Ok(session);
    }

    [HttpDelete("sessions/{sessionId}")]
    public async Task<IActionResult> DeleteSession(string sessionId)
    {
        var session = await _context.ChatSessions.FindAsync(sessionId);
        if (session == null) return NotFound();

        _context.ChatSessions.Remove(session);
        await _context.SaveChangesAsync();
        return Ok(new { success = true });
    }

    [HttpDelete("sessions/inactive/clear")]
    public async Task<IActionResult> ClearInactiveSessions()
    {
        var resolved = await _context.ChatSessions.Where(s => s.Status == "resolved").ToListAsync();
        _context.ChatSessions.RemoveRange(resolved);
        await _context.SaveChangesAsync();
        return Ok(new { success = true, deletedCount = resolved.Count });
    }

    [HttpPost("sessions/{sessionId}/messages")]
    public async Task<IActionResult> AddMessage(string sessionId, [FromBody] ChatMessageDto dto)
    {
        var session = await _context.ChatSessions.FindAsync(sessionId);
        var now = DateTime.UtcNow.ToString("o");

        var newMsg = new
        {
            id = Guid.NewGuid().ToString("N"),
            text = dto.Text ?? string.Empty,
            sender = dto.Sender ?? "user",
            timestamp = now
        };

        if (session == null)
        {
            var msgs = new List<object> { newMsg };
            session = new ChatSession
            {
                Id = sessionId,
                CustomerName = dto.UserName ?? "Visitor",
                Email = dto.UserEmail ?? string.Empty,
                Mobile = dto.UserMobile ?? string.Empty,
                Status = "active",
                LastMessage = dto.Text ?? string.Empty,
                LastMessageTime = now,
                MessagesJson = JsonSerializer.Serialize(msgs),
                UnreadAdmin = dto.Sender == "user" ? 1 : 0,
                UnreadUser = dto.Sender == "admin" ? 1 : 0,
                AdminJoined = dto.Sender == "admin"
            };
            _context.ChatSessions.Add(session);
        }
        else
        {
            var msgs = new List<JsonElement>();
            if (!string.IsNullOrWhiteSpace(session.MessagesJson))
            {
                try { msgs = JsonSerializer.Deserialize<List<JsonElement>>(session.MessagesJson) ?? new List<JsonElement>(); } catch { }
            }

            var updatedList = new List<object>(msgs.Cast<object>()) { newMsg };
            session.MessagesJson = JsonSerializer.Serialize(updatedList);
            session.LastMessage = dto.Text ?? string.Empty;
            session.LastMessageTime = now;
            if (!string.IsNullOrWhiteSpace(dto.UserName)) session.CustomerName = dto.UserName;
            if (!string.IsNullOrWhiteSpace(dto.UserEmail)) session.Email = dto.UserEmail;
            if (!string.IsNullOrWhiteSpace(dto.UserMobile)) session.Mobile = dto.UserMobile;

            if (dto.Sender == "user")
            {
                session.UnreadAdmin += 1;
            }
            else if (dto.Sender == "admin")
            {
                session.UnreadUser += 1;
                session.AdminJoined = true;
            }
        }

        await _context.SaveChangesAsync();
        return Ok(newMsg);
    }

    // --- Chatbot Q&A Knowledge Base ---
    [HttpGet("qa")]
    public async Task<IActionResult> GetQaList()
    {
        var list = await _context.ChatbotQas.OrderByDescending(q => q.CreatedAt).ToListAsync();
        return Ok(list);
    }

    [HttpPost("qa")]
    public async Task<IActionResult> CreateQa([FromBody] QaItemDto dto)
    {
        var item = new ChatbotQa
        {
            QuestionKeywords = dto.QuestionKeywords,
            AnswerText = dto.AnswerText,
            CreatedAt = DateTime.UtcNow.ToString("o")
        };
        _context.ChatbotQas.Add(item);
        await _context.SaveChangesAsync();
        return Ok(item);
    }

    [HttpPut("qa/{id}")]
    public async Task<IActionResult> UpdateQa(string id, [FromBody] QaItemDto dto)
    {
        var item = await _context.ChatbotQas.FindAsync(id);
        if (item == null) return NotFound();

        item.QuestionKeywords = dto.QuestionKeywords;
        item.AnswerText = dto.AnswerText;
        await _context.SaveChangesAsync();
        return Ok(item);
    }

    [HttpDelete("qa/{id}")]
    public async Task<IActionResult> DeleteQa(string id)
    {
        var item = await _context.ChatbotQas.FindAsync(id);
        if (item == null) return NotFound();

        _context.ChatbotQas.Remove(item);
        await _context.SaveChangesAsync();
        return Ok(new { success = true });
    }

    // --- Chat Settings ---
    [HttpGet("settings")]
    public async Task<IActionResult> GetSettings()
    {
        var record = await _context.WebsiteContents.FindAsync("system_chatSettings");
        if (record == null)
        {
            return Ok(new { isLiveSupportActive = true });
        }
        return Content(record.DataJson, "application/json");
    }

    [HttpPost("settings")]
    public async Task<IActionResult> SaveSettings([FromBody] JsonElement body)
    {
        var record = await _context.WebsiteContents.FindAsync("system_chatSettings");
        var jsonStr = body.GetRawText();
        if (record == null)
        {
            record = new WebsiteContent
            {
                Key = "system_chatSettings",
                DataJson = jsonStr,
                UpdatedAt = DateTime.UtcNow
            };
            _context.WebsiteContents.Add(record);
        }
        else
        {
            record.DataJson = jsonStr;
            record.UpdatedAt = DateTime.UtcNow;
        }
        await _context.SaveChangesAsync();
        return Ok(new { success = true });
    }
}
