using Microsoft.EntityFrameworkCore;
using DevVault.Application.Interfaces;
using DevVault.Domain.Entities;
using DevVault.Infrastructure.Data;


namespace DevVault.Infrastructure.Repositories;

public class CategoriaRepository : ICategoriaRepository
{
  private readonly DevVaultDbContext _context;

  public CategoriaRepository(DevVaultDbContext context)
  {
    _context = context;
  }

  public async Task<IEnumerable<Categoria>> GetAllAsync()
  {
    return await _context.Categorias.ToListAsync();
  }

  public async Task<Categoria> AddAsync(Categoria categoria)
  {

    await _context.Categorias.AddAsync(categoria);

    await _context.SaveChangesAsync();

    return categoria;



  }

}

