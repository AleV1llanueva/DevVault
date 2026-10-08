

namespace DevVault.Domain.Entities;

public class AtajoRapido
{
  public int Id { get; set; }
  public string AliasPersonal { get; set; } = string.Empty;
  public int FrecuenciaUso { get; set; }


  public int ComandoId { get; set; }

  //Con null! le decimos que no sera nula cuando se use
  public Comando Comando { get; set; } = null!;
}


