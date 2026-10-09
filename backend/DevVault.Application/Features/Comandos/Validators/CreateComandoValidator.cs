using FluentValidation;
using DevVault.Application.Features.Comandos.DTOs;
using DevVault.Application.Interfaces;

namespace DevVault.Application.Features.Comandos.Validators;

public class CreateComandoValidator : AbstractValidator<CreateComandoRequestDto>
{
  private readonly ICategoriaRepository _categoriaRepository;

  public CreateComandoValidator(ICategoriaRepository categoriaRepository)
  {

    _categoriaRepository = categoriaRepository;

    RuleFor(x => x.Titulo)
      .NotEmpty().WithMessage("El titulo del comando no puede estar vacio")
      .MinimumLength(3).WithMessage("El titulo debe contener al menos 5 caracteres")
      .MaximumLength(50).WithMessage("La titulo es muy grande");


    RuleFor(x => x.ComandoText)
        .NotEmpty().WithMessage("El Comando no puede ir vacio");

    RuleFor(x => x.CategoriaId)
      .GreaterThan(0).WithMessage("Debe seleccionar una categoria valida")
      .MustAsync(async (categoriaId, cancellationToken) =>
        await _categoriaRepository.ExistsAsync(categoriaId))
      .WithMessage("La categoría no selecccionada no existe");
  }
}
