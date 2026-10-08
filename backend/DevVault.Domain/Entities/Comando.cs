
namespace DevVault.Domain.Entities;

public class Comando
{
  public int Id { get; set; }
  public string Titulo { get; set; } = string.Empty;
  public string ComandoText { get; set; } = string.Empty;
  public string Explicacion { get; set; } = string.Empty;

  public int CategoriaId { get; set; }

  //Con null! le decimos que no sera nula cuando se use
  public Categoria Categoria { get; set; } = null!;
}


