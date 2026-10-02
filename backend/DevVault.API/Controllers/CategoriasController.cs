using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using DevVault.Application.Interfaces;
using DevVault.Domain.Entities;
using DevVault.Application.Features.Categorias.DTOs;

namespace DevVault.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriasController : ControllerBase
{
  private readonly ICategoriaRepository _repository;
  private readonly IValidator<CreateCategoriaRequestDto> _validator;

  public CategoriasController(
    ICategoriaRepository repository,
    IValidator<CreateCategoriaRequestDto> validator)
  {
    _repository = repository;
    _validator = validator;
  }

  [HttpGet]
  public async Task<IActionResult> GetCategorias()
  {
    var categorias = await _repository.GetAllAsync();

    var response = categorias.Select(c => new CategoriaResponseDto
    {
      Id = c.Id,
      Nombre = c.Nombre,
      ColorHex = c.ColorHex
    });

    return Ok(response);
  }

  [HttpPost]
  public async Task<IActionResult> CrearCategoria([FromBody] CreateCategoriaRequestDto request)
  {
    var validationResult = await _validator.ValidateAsync(request);
    if (!validationResult.IsValid)
    {
      return BadRequest(validationResult.Errors);
    }

    var nuevaCategoria = new Categoria { Nombre = request.Nombre, ColorHex = request.ColorHex };
    var creada = await _repository.AddAsync(nuevaCategoria);

    var response = new CategoriaResponseDto { Id = creada.Id, Nombre = creada.Nombre, ColorHex = creada.ColorHex };

    return CreatedAtAction(nameof(GetCategorias), new { id = response.Id }, response);
  }
}
