var builder = WebApplication.CreateBuilder(args);
var webBuilder = WebApplication.CreateBuilder(args);

// Add services to the container.
webBuilder.Services.AddControllers();
webBuilder.Services.AddCors(options =>
{
    options.AddPolicy("Localhost3000", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .WithMethods("GET", "POST")
              .AllowAnyHeader();
    });
});
var app = webBuilder.Build();

// Configure the HTTP request pipeline.

app.UseStaticFiles();

app.UseCors("Localhost3000");

app.UseAuthorization();

app.MapControllers();

app.MapGet("/", context =>
{
    context.Response.Redirect("/index.html");
    return Task.CompletedTask;
});

app.Run();
