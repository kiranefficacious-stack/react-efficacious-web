using Microsoft.EntityFrameworkCore;
using Efficacious.Api.Models; 

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSingleton<Efficacious.Api.Services.EmailService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var dbFolder = Path.Combine(builder.Environment.ContentRootPath, "backend", "Efficacious.Api");
var dbPath = Directory.Exists(dbFolder) ? Path.Combine(dbFolder, "Efficacious.db") : Path.Combine(AppContext.BaseDirectory, "Efficacious.db");

builder.Services.AddDbContext<Efficacious.Api.Data.AppDbContext>(options =>
    options.UseSqlite($"Data Source={dbPath}"));

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

// Ensure all database tables exist automatically
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<Efficacious.Api.Data.AppDbContext>();
    dbContext.Database.EnsureCreated();
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
