using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using DevVault.Application.Interfaces;
using DevVault.Domain.Entities;
using DevVault.Application.Features.Categorias.DTOs;
using Microsoft.EntityFrameworkCore;

namespace DevVault.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriasController : ControllerBase
{
  private readonly ICategoriaRepository _repository;
  private readonly IValidator<CreateCategoriaRequestDto> _createValidator;
  private readonly IValidator<UpdateCategoriaRequestDto> _updateValidator;

  public CategoriasController(
    ICategoriaRepository repository,
    IValidator<CreateCategoriaRequestDto> createValidator,
    IValidator<UpdateCategoriaRequestDto> updateValidator)
  {
    _repository = repository;
    _createValidator = createValidator;
    _updateValidator = updateValidator;

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
    var validationResult = await _createValidator.ValidateAsync(request);
    if (!validationResult.IsValid)
    {
      return BadRequest(validationResult.Errors);
    }

    var nuevaCategoria = new Categoria { Nombre = request.Nombre, ColorHex = request.ColorHex };
    var creada = await _repository.AddAsync(nuevaCategoria);

    var response = new CategoriaResponseDto { Id = creada.Id, Nombre = creada.Nombre, ColorHex = creada.ColorHex };

    return CreatedAtAction(nameof(GetCategorias), new { id = response.Id }, response);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetCategoriaById(int id)
  {

    var categoria = await _repository.GetByIdAsync(id);

    if (categoria == null)
      return NotFound(new { mensaje = "No se encontro una Categoría con el Id ingresado" });

    return Ok(new CategoriaResponseDto { Id = categoria.Id, Nombre = categoria.Nombre, ColorHex = categoria.ColorHex });
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateCategoriaById(int id, [FromBody] Categoria categoria)
  {
    if (id != categoria.Id)
      return BadRequest(new { mensaje = "No se encontro una Categoría con el Id ingresado" });

    var categoriaValidation = new UpdateCategoriaRequestDto
    {
      Nombre = categoria.Nombre,
      ColorHex = categoria.ColorHex
    };

    var validationResult = await _updateValidator.ValidateAsync(categoriaValidation);
    if (!validationResult.IsValid)
    {
      return BadRequest(validationResult.Errors);
    }

    try
    {
      await _repository.UpdateByIdAsync(id, categoria);
    }
    catch (DbUpdateConcurrencyException)
    {
      var existe = await _repository.GetByIdAsync(id) != null;
      if (!existe)
      {
        return NotFound(new { mensaje = "No se pudo actualizar. La categoria gue eliminada por otro usuario" });
      }
      else
      {
        throw;
      }
    }

    return Ok(new CategoriaResponseDto
    {
      Id = categoria.Id,
      Nombre = categoria.Nombre,
      ColorHex = categoria.ColorHex
    });
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteCategoriaById(int id)
  {

    var categoriaEliminada = await _repository.DeleteByIdAsync(id);

    if (categoriaEliminada == null)
    {
      return NotFound(new { mensaje = "No se encontro la categoria" });
    }

    return Ok(new CategoriaResponseDto
    {
      Id = categoriaEliminada.Id,
      Nombre = categoriaEliminada.Nombre,
      ColorHex = categoriaEliminada.ColorHex
    });
  }
}
