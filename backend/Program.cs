using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Services;
using Repositories;
using DotNetEnv;


var builder = WebApplication.CreateBuilder(args);


Env.Load();



// Add services to the container.
builder.Services.AddControllers();
var connectionString = Environment.GetEnvironmentVariable("ConnectionString");
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
var logger = builder.Logging.Services.BuildServiceProvider().GetRequiredService<ILogger<Program>>();
logger.LogInformation("Connection String: {ConnectionString}", connectionString);

// Configure DbContext before building the app
// if (builder.Environment.IsDevelopment())
// {
//     builder.Services.AddDbContext<DataContext>(options =>
//         options.UseInMemoryDatabase("Student"));
// }
// else
// {
builder.Services.AddDbContext<DataContext>(options =>options.UseSqlServer(connectionString));
// }

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IFighterRepository, FighterRepository>();
builder.Services.AddScoped<IFavoriteFighterRepository, FavoriteFighterRepository>();
builder.Services.AddScoped<IUserService, UserService>();



builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => {
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter your username",
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
});

var app = builder.Build();

// Enable CORS
app.UseCors("AllowReactApp");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    DataSeeder.SeedData(services);
}


app.Run();