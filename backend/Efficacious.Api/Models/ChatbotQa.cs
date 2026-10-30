using System.ComponentModel.DataAnnotations;

namespace Efficacious.Api.Models;

public class ChatbotQa
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString("N");
    public string QuestionKeywords { get; set; } = string.Empty;
    public string AnswerText { get; set; } = string.Empty;
    public string CreatedAt { get; set; } = DateTime.UtcNow.ToString("o");
}

