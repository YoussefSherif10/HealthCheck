using api;

var builder = WebApplication.CreateBuilder(args); // the WebApplication class contains the implementation of the old IWebHostBuilder

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// enabling CORS for the front-end
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:4200")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

// adding health checks middleware with ICMP check
builder.Services.AddHealthChecks()
        .AddCheck("ICMP_01",
            new ICMPHealthCheck("www.ryadel.com", 100))
         .AddCheck("ICMP_02",
            new ICMPHealthCheck("www.google.com", 100))
         .AddCheck("ICMP_03",
            new ICMPHealthCheck($"www.{Guid.NewGuid():N}.com", 100)); ;


var app = builder.Build();

app.UseCors();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// a new route is created for the health check
app.UseHealthChecks(new PathString("/api/health"), new CustomHealthCheckOptions());
// app.MapHealthChecks("/api/health");

app.MapControllers();

app.Run();

