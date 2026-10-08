
namespace DevVault.Application.Features.Comandos.DTOs;


public class UpdateComandoRequestDto
{
  public string Titulo { get; set; } = string.Empty;
  public string ComandoText { get; set; } = string.Empty;
  public string Explicacion { get; set; } = string.Empty;

  public int CategoriaId { get; set; }
}
