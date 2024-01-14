using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
// builder.Services.AddDevExpressControls();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddCors();
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Backend", Version = "v1" });
});

// Configure the HTTP request pipeline

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Backend v1"));
}


// app.UseHttpsRedirection();

//app.UseRouting();

app.UseCors(x => x.AllowAnyHeader()
    .AllowAnyMethod()
    .WithOrigins("http://localhost:4200"));

app.UseAuthentication();

app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();

app.MapFallbackToController("Index", "Fallback");

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<WakDbContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
    
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(userManager, roleManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration.");
}

await app.RunAsync();

// namespace Backend
// {
//     public class Program
//     {
//         public static async Task Main(string[] args)
//         {
//             var host = CreateHostBuilder(args).Build();
//             using var scope = host.Services.CreateScope();
//             varbuilder. services = scope.ServiceProvider;
//             try
//             {
//                 var context =builder. services.GetRequiredService<WakDbContext>();
//                 var userManager =builder. services.GetRequiredService<UserManager<AppUser>>();
//                 await context.Database.MigrateAsync();
//                 await Seed.SeedUsers(userManager);
//             }
//             catch (Exception ex)
//             {
//                 var logger =builder. services.GetRequiredService<ILogger<Program>>();
//                 logger.LogError(ex, "An error occurred during migration.");
//             }

//             await host.RunAsync();
//         }

//         public static IHostBuilder CreateHostBuilder(string[] args) =>
//             Host.CreateDefaultBuilder(args)
//                 .ConfigureWebHostDefaults(webBuilder =>
//                 {
//                     webBuilder.UseStartup<Startup>();
//                 });
//     }
// }
