using Efficacious.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Efficacious.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<Contact> Contacts { get; set; }
    public DbSet<ContactInquiry> ContactInquiries { get; set; }
    public DbSet<CareerApplication> CareerApplications { get; set; }
    public DbSet<WebsiteContent> WebsiteContents { get; set; }
    public DbSet<ChatSession> ChatSessions { get; set; }
    public DbSet<ChatbotQa> ChatbotQas { get; set; }

    // Dedicated Section Tables
    public DbSet<Blog> Blogs { get; set; }
    public DbSet<Career> Careers { get; set; }
    public DbSet<GalleryItem> Galleries { get; set; }
    public DbSet<CompanyContact> CompanyContacts { get; set; }
    public DbSet<NewsArticle> NewsArticles { get; set; }
    public DbSet<Partner> Partners { get; set; }
    public DbSet<PortfolioProject> Portfolios { get; set; }
    public DbSet<ServiceItem> Services { get; set; }
    public DbSet<TeamMember> TeamMembers { get; set; }
    public DbSet<AboutContent> AboutContents { get; set; }

    // Additional Relational Tables
    public DbSet<Testimonial> Testimonials { get; set; }
    public DbSet<ClientLogo> Clients { get; set; }
    public DbSet<AdminUser> AdminUsers { get; set; }
    public DbSet<SystemSetting> SystemSettings { get; set; }
    public DbSet<NewsletterSubscriber> NewsletterSubscribers { get; set; }
    public DbSet<AuditLog> AuditLogs { get; set; }
}
