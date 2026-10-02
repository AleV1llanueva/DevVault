using DevVault.Domain.Entities;

namespace DevVault.Application.Interfaces;

public interface ICategoriaRepository
{

  Task<IEnumerable<Categoria>> GetAllAsync();

  Task<Categoria> AddAsync(Categoria categoria);
}


