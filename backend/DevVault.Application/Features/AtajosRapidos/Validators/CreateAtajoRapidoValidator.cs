using FluentValidation;
using DevVault.Application.Features.AtajosRapidos.DTOs;
using DevVault.Application.Interfaces;

namespace DevVault.Application.Features.AtajosRapidos.Validators;

public class CreateAtajoRapidoValidator : AbstractValidator<CreateAtajoRapidoRequestDto>
{

  private readonly IComandoRepository _comandoRepository;

  public CreateAtajoRapidoValidator(IComandoRepository comandoRepository)
  {


    _comandoRepository = comandoRepository;

    RuleFor(x => x.AliasPersonal)
      .NotEmpty().WithMessage("El Alias del comando no puede estar vacio");

    RuleFor(x => x.FrecuenciaUso)
      .GreaterThan(0).WithMessage("El valor debe ser mayor a 0.");

    RuleFor(x => x.ComandoId)
      .GreaterThan(0).WithMessage("Elige una categoria existente")
      .MustAsync(async (comandoId, cancellationToken) =>
          await _comandoRepository.ExistsAsync(comandoId))
      .WithMessage("El comando seleccionado no existe");
  }
}
