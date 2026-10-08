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

  //Obtain all of categories

  public async Task<IEnumerable<Categoria>> GetAllAsync()
  {
    return await _context.Categorias.ToListAsync();
  }

  //Create a category

  public async Task<Categoria> AddAsync(Categoria categoria)
  {

    await _context.Categorias.AddAsync(categoria);

    await _context.SaveChangesAsync();

    return categoria;

  }

  //Search category by id

  public async Task<Categoria?> GetByIdAsync(int id)
  {
    return await _context.Categorias.FindAsync(id);
  }

  //Update category by Id

  public async Task<Categoria?> UpdateByIdAsync(int id, Categoria categoria)
  {

    categoria.Id = id;

    bool existe = await _context.Categorias.AnyAsync(x => x.Id == id);

    if (!existe) return null;

    _context.Categorias.Update(categoria);
    await _context.SaveChangesAsync();

    return categoria;
  }

  public async Task<Categoria?> DeleteByIdAsync(int id)
  {
    var categoria = await _context.Categorias.FindAsync(id);

    if (categoria == null)
      return null;

    _context.Categorias.Remove(categoria);
    await _context.SaveChangesAsync();

    return categoria;
  }

}

