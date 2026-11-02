using Microsoft.EntityFrameworkCore;
using Efficacious.Api.Models; 

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSingleton<Efficacious.Api.Services.EmailService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Database Engine (Supports Microsoft SQL Server & SQLite seamlessly)
var dbProvider = (builder.Configuration["DatabaseProvider"] ?? "Sqlite").Trim();
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? string.Empty;

var isSqlServer = (dbProvider.Equals("SqlServer", StringComparison.OrdinalIgnoreCase) ||
                  (!string.IsNullOrWhiteSpace(connectionString) &&
                   (connectionString.Contains("Server=", StringComparison.OrdinalIgnoreCase) ||
                    connectionString.Contains("Data Source=tcp:", StringComparison.OrdinalIgnoreCase) ||
                    connectionString.Contains("Initial Catalog=", StringComparison.OrdinalIgnoreCase))))
                  && !connectionString.Contains("YOUR_SQL_SERVER_HOST", StringComparison.OrdinalIgnoreCase);

builder.Services.AddDbContext<Efficacious.Api.Data.AppDbContext>(options =>
{
    if (isSqlServer)
    {
        Console.WriteLine("[Database] Initializing Microsoft SQL Server connection...");
        options.UseSqlServer(connectionString, sqlOptions =>
        {
            sqlOptions.EnableRetryOnFailure(
                maxRetryCount: 5,
                maxRetryDelay: TimeSpan.FromSeconds(10),
                errorNumbersToAdd: null);
        });
    }
    else
    {
        if (connectionString.Contains("YOUR_SQL_SERVER_HOST", StringComparison.OrdinalIgnoreCase))
        {
            Console.WriteLine("[Database] SQL Server placeholder detected in config. Automatically falling back to bundled SQLite database (Efficacious.db)...");
        }

        var dbFolder = Path.Combine(builder.Environment.ContentRootPath, "backend", "Efficacious.Api");
        var dbPath = Directory.Exists(dbFolder) ? Path.Combine(dbFolder, "Efficacious.db") : Path.Combine(AppContext.BaseDirectory, "Efficacious.db");
        var sqliteConn = (!string.IsNullOrWhiteSpace(connectionString) && connectionString.Contains(".db", StringComparison.OrdinalIgnoreCase))
            ? connectionString
            : $"Data Source={dbPath}";

        Console.WriteLine($"[Database] Initializing SQLite connection ({sqliteConn})...");
        options.UseSqlite(sqliteConn);
    }
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

var app = builder.Build();

// Ensure all database tables exist automatically and default admin is seeded
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<Efficacious.Api.Data.AppDbContext>();
    dbContext.Database.EnsureCreated();

    // Auto-seed default SuperAdmin on first startup (e.g. fresh SQL Server database)
    if (!dbContext.AdminUsers.Any())
    {
        var adminEmail = builder.Configuration["Admin:Email"] ?? "admin@efficacious.co.in";
        var adminPass = builder.Configuration["Admin:Password"] ?? "Admin@123";

        dbContext.AdminUsers.Add(new AdminUser
        {
            Email = adminEmail.Trim().ToLowerInvariant(),
            PasswordHash = adminPass.Trim(),
            DisplayName = "Efficacious Administrator",
            Role = "SuperAdmin",
            IsActive = 1,
            CreatedAt = DateTime.UtcNow.ToString("o")
        });
        dbContext.SaveChanges();
        Console.WriteLine($"[Database] Default administrator seeded: {adminEmail}");
    }
}

app.UseCors("AllowAll");

// Enable Swagger UI across all environments so both http://localhost:5231 and /swagger work immediately
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Efficacious API v1");
    c.RoutePrefix = "swagger"; // Available at /swagger and /swagger/index.html
});

// Redirect root / and /swagger directly to /swagger/index.html
app.MapGet("/", () => Results.Redirect("/swagger/index.html"));
app.MapGet("/swagger", () => Results.Redirect("/swagger/index.html"));

app.MapControllers();

app.Run();
