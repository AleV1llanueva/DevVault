using FluentValidation;
using DevVault.Application.Features.Categorias.DTOs;

namespace DevVault.Application.Features.Categorias.Validators;

public class CreateCategoriaValidator : AbstractValidator<CreateCategoriaRequestDto>
{
  public CreateCategoriaValidator()
  {
    RuleFor(x => x.Nombre)
      .NotEmpty().WithMessage("El nombre de la cateogoria no puede estar vacio")
      .MinimumLength(3).WithMessage("'Nombre' debe contener al menos 3 caracteres")
      .MaximumLength(100).WithMessage("La categoria es muy grande");


    RuleFor(x => x.ColorHex)
        .NotEmpty().WithMessage("El color hexadecimal no puede ir vacío")
        .MinimumLength(3).WithMessage("El color debe tener 3 caracteres")
        .MaximumLength(6).WithMessage("El color no puede tener mas de 6 caracteres");
  }
}
