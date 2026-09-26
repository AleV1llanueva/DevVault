using Microsoft.EntityFrameworkCore;
using DevVault.Domain.Entities;

namespace DevVault.Infrastructure.Data;

public class DevVaultDbContext : DbContext
{
  public DevVaultDbContext(DbContextOptions<DevVaultDbContext> options) : base(options) { }

  public DbSet<Categoria> Categorias { get; set; }

}
