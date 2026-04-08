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
}
