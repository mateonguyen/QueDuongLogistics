namespace Backend.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddScoped<ITokenService, TokenService>();

        services.AddScoped<LogUserActivity>();

        services.AddScoped<IUnitOfWork, UnitOfWork>();

        services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);

        services.AddDbContext<WakDbContext>(x =>
        {
            x.UseSqlServer(config.GetConnectionString("WakConnect"));
            // x.UseOracle(config.GetConnectionString("WakConnect"));
        });

        services.AddTransient<IPhotoService, PhotoService>();
        services.AddScoped<IUserResolverService, UserResolverService>();
        services.AddTransient<IFileService, FileService>();

        return services;
    }
}