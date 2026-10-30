using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class ChatSession
{
    [Key]
    public string Id { get; set; } = string.Empty;
    public string? CustomerName { get; set; }
    public string? Email { get; set; }
    public string? Mobile { get; set; }
    public string? Status { get; set; }
    public string? LastMessage { get; set; }
    public string? LastMessageTime { get; set; }
    public string? MessagesJson { get; set; }
    public bool AdminJoined { get; set; } = false;
    public int UnreadAdmin { get; set; } = 0;
    public int UnreadUser { get; set; } = 0;
}
