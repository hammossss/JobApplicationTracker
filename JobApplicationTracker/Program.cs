using JobTrackerAPI.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Registrera databasen
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=jobs.db"));

builder.Services.AddControllers();

// Lägg till Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Skapa databasen vid behov
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// Aktivera Swagger
app.UseSwagger();
app.UseSwaggerUI();

app.MapControllers();

app.Run();
