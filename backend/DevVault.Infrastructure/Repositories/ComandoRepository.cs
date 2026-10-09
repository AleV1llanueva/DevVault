
using Microsoft.EntityFrameworkCore;
using DevVault.Application.Interfaces;
using DevVault.Domain.Entities;
using DevVault.Infrastructure.Data;


namespace DevVault.Infrastructure.Repositories;

public class ComandoRepository : IComandoRepository
{
  private readonly DevVaultDbContext _context;

  public ComandoRepository(DevVaultDbContext context)
  {
    _context = context;
  }

  //Obtain all of categories

  public async Task<IEnumerable<Comando>> GetAllAsync()
  {
    return await _context.Comandos.ToListAsync();
  }

  //Create a category

  public async Task<Comando> AddAsync(Comando comando)
  {

    await _context.Comandos.AddAsync(comando);

    await _context.SaveChangesAsync();

    return comando;

  }

  //Search category by id

  public async Task<Comando?> GetByIdAsync(int id)
  {
    return await _context.Comandos.FindAsync(id);
  }

  //Update category by Id

  public async Task<Comando?> UpdateByIdAsync(int id, Comando comando)
  {

    comando.Id = id;

    bool existe = await _context.Comandos.AnyAsync(x => x.Id == id);

    if (!existe) return null;

    _context.Comandos.Update(comando);
    await _context.SaveChangesAsync();

    return comando;
  }

  public async Task<Comando?> DeleteByIdAsync(int id)
  {
    var comando = await _context.Comandos.FindAsync(id);

    if (comando == null)
      return null;

    _context.Comandos.Remove(comando);
    await _context.SaveChangesAsync();

    return comando;
  }

  public async Task<bool> ExistsAsync(int id)
  {
    return await _context.Comandos.AnyAsync(x => x.Id == id);
  }

}

