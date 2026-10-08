using FluentValidation;
using DevVault.Application.Features.AtajosRapidos.DTOs;

namespace DevVault.Application.Features.AtajosRapidos.Validators;

public class CreateAtajoRapidoValidator : AbstractValidator<CreateAtajoRapidoRequestDto>
{
  public CreateAtajoRapidoValidator()
  {
    RuleFor(x => x.AliasPersonal)
      .NotEmpty().WithMessage("El Alias del comando no puede estar vacio");

    RuleFor(x => x.FrecuenciaUso)
      .GreaterThan(0).WithMessage("El valor debe ser 0 o mayor.");

    RuleFor(x => x.ComandoId)
      .GreaterThan(0).WithMessage("Elige una categoria existente");
  }
}
