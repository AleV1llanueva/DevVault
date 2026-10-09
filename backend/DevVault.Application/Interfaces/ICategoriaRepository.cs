using DevVault.Domain.Entities;

namespace DevVault.Application.Interfaces;

public interface ICategoriaRepository
{

  Task<IEnumerable<Categoria>> GetAllAsync();

  Task<Categoria> AddAsync(Categoria categoria);

  Task<Categoria?> GetByIdAsync(int id);

  Task<Categoria?> DeleteByIdAsync(int id);

  Task<Categoria?> UpdateByIdAsync(int id, Categoria categoria);

  Task<bool> ExistsAsync(int id);
}


