

using DevVault.Domain.Entities;

namespace DevVault.Application.Interfaces;

public interface IAtajoRapidoRepository
{

  Task<IEnumerable<AtajoRapido>> GetAllAsync();

  Task<AtajoRapido> AddAsync(AtajoRapido atajoRapido);

  Task<AtajoRapido?> GetByIdAsync(int id);

  Task<AtajoRapido?> DeleteByIdAsync(int id);

  Task<AtajoRapido?> UpdateByIdAsync(int id, AtajoRapido atajoRapido);

}


