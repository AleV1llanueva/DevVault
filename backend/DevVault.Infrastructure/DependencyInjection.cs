using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

using DevVault.Application.Interfaces;
using DevVault.Infrastructure.Data;
using DevVault.Infrastructure.Repositories;


namespace DevVault.Infrastructure;

public static class DependencyInjection
{
  public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString)
  {

    services.AddDbContext<DevVaultDbContext>(options =>
        options.UseNpgsql(connectionString));


    services.AddScoped<ICategoriaRepository, CategoriaRepository>();

    return services;
  }
}
