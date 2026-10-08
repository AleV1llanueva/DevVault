
using DevVault.Domain.Entities;

namespace DevVault.Application.Interfaces;

public interface IComandoRepository
{

  Task<IEnumerable<Comando>> GetAllAsync();

  Task<Comando> AddAsync(Comando comando);

  Task<Comando?> GetByIdAsync(int id);

  Task<Comando?> DeleteByIdAsync(int id);

  Task<Comando?> UpdateByIdAsync(int id, Comando comando);

}


