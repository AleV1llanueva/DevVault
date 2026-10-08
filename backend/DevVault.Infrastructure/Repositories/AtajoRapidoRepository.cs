

using Microsoft.EntityFrameworkCore;
using DevVault.Application.Interfaces;
using DevVault.Domain.Entities;
using DevVault.Infrastructure.Data;


namespace DevVault.Infrastructure.Repositories;

public class AtajoRapidoRepository : IAtajoRapidoRepository
{
  private readonly DevVaultDbContext _context;

  public AtajoRapidoRepository(DevVaultDbContext context)
  {
    _context = context;
  }

  //Obtain all of categories

  public async Task<IEnumerable<AtajoRapido>> GetAllAsync()
  {
    return await _context.AtajosRapidos.ToListAsync();
  }

  //Create a category

  public async Task<AtajoRapido> AddAsync(AtajoRapido atajoRapido)
  {

    await _context.AtajosRapidos.AddAsync(atajoRapido);

    await _context.SaveChangesAsync();

    return atajoRapido;

  }

  //Search category by id

  public async Task<AtajoRapido?> GetByIdAsync(int id)
  {
    return await _context.AtajosRapidos.FindAsync(id);
  }

  //Update category by Id

  public async Task<AtajoRapido?> UpdateByIdAsync(int id, AtajoRapido atajoRapido)
  {

    atajoRapido.Id = id;

    bool existe = await _context.AtajosRapidos.AnyAsync(x => x.Id == id);

    if (!existe) return null;

    _context.AtajosRapidos.Update(atajoRapido);
    await _context.SaveChangesAsync();

    return atajoRapido;
  }

  public async Task<AtajoRapido?> DeleteByIdAsync(int id)
  {
    var atajoRapido = await _context.AtajosRapidos.FindAsync(id);

    if (atajoRapido == null)
      return null;

    _context.AtajosRapidos.Remove(atajoRapido);
    await _context.SaveChangesAsync();

    return atajoRapido;
  }

}

