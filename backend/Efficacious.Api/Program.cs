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

        // Robust absolute path resolution for zero-config IIS & Linux deployment
        var dbPath = Path.Combine(AppContext.BaseDirectory, "Efficacious.db");
        if (!File.Exists(dbPath))
        {
            var contentRootDb = Path.Combine(builder.Environment.ContentRootPath, "Efficacious.db");
            var devDb = Path.Combine(builder.Environment.ContentRootPath, "backend", "Efficacious.Api", "Efficacious.db");
            if (File.Exists(contentRootDb)) dbPath = contentRootDb;
            else if (File.Exists(devDb)) dbPath = devDb;
        }

        var sqliteConn = $"Data Source={dbPath}";

        Console.WriteLine($"[Database] Initializing SQLite connection ({sqliteConn})...");

        // Test directory write access early to diagnose IIS file permissions
        try
        {
            var dbDir = Path.GetDirectoryName(dbPath) ?? AppContext.BaseDirectory;
            var testFile = Path.Combine(dbDir, ".perm_test");
            File.WriteAllText(testFile, "test");
            File.Delete(testFile);
            Console.WriteLine($"[Database] Directory write permissions verified: {dbDir}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[Database WARNING] SQLite directory is NOT writable by IIS / worker process: {ex.Message}");
            Console.WriteLine("[Database WARNING] Please grant Modify & Write permissions to 'IIS_IUSRS' on this folder.");
        }

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

// Normalize any double /api/api path so it never happens
app.Use(async (context, next) =>
{
    var path = context.Request.Path.Value ?? "";
    if (path.StartsWith("/api/api", StringComparison.OrdinalIgnoreCase))
    {
        context.Request.Path = path.Substring(4);
    }
    await next();
});

// Support /api path prefix cleanly on both local and live
app.UsePathBase("/api");

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
