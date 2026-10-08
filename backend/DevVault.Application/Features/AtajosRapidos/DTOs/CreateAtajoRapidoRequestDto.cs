namespace DevVault.Application.Features.AtajosRapidos.DTOs;


public class CreateAtajoRapidoRequestDto
{
  public string AliasPersonal { get; set; } = string.Empty;
  public int FrecuenciaUso { get; set; }

  public int ComandoId { get; set; }
}
