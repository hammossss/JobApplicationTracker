// Program.cs
using JobTrackerAPI.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Registrera databasen
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=jobs.db"));

builder.Services.AddControllers();

var app = builder.Build();

// Starta databasen
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated(); // Skapar databasen om den inte finns
}

app.MapControllers(); // Karta till kontrollern

app.Run();

