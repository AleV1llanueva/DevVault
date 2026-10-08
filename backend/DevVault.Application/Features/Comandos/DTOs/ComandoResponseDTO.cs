namespace DevVault.Application.Features.Comandos.DTOs;

public class ComandoResponseDto
{

  public int Id { get; set; }
  public string Titulo { get; set; } = string.Empty;
  public string ComandoText { get; set; } = string.Empty;
  public string Explicacion { get; set; } = string.Empty;

  public int CategoriaId { get; set; }
}



