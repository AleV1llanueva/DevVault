namespace DevVault.Application.Features.AtajosRapidos.DTOs;

public class AtajoRapidoResponseDto
{

  public int Id { get; set; }
  public string AliasPersonal { get; set; } = string.Empty;
  public int FrecuenciaUso { get; set; }

  public int ComandoId { get; set; }
}



