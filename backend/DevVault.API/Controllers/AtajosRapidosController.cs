

using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using DevVault.Application.Interfaces;
using DevVault.Domain.Entities;
using DevVault.Application.Features.AtajosRapidos.DTOs;
using Microsoft.EntityFrameworkCore;

namespace DevVault.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AtajosRapidosController : ControllerBase
{
  private readonly IAtajoRapidoRepository _repository;
  private readonly IValidator<CreateAtajoRapidoRequestDto> _createValidator;
  private readonly IValidator<UpdateAtajoRapidoRequestDto> _updateValidator;

  public AtajosRapidosController(
    IAtajoRapidoRepository repository,
    IValidator<CreateAtajoRapidoRequestDto> createValidator,
    IValidator<UpdateAtajoRapidoRequestDto> updateValidator)
  {
    _repository = repository;
    _createValidator = createValidator;
    _updateValidator = updateValidator;

  }

  [HttpGet]
  public async Task<IActionResult> GetAtajosRapidos()
  {
    var atajosRapidos = await _repository.GetAllAsync();

    var response = atajosRapidos.Select(c => new AtajoRapidoResponseDto
    {
      Id = c.Id,
      AliasPersonal = c.AliasPersonal,
      FrecuenciaUso = c.FrecuenciaUso,
      ComandoId = c.ComandoId
    });

    return Ok(response);
  }

  [HttpPost]
  public async Task<IActionResult> CrearAtajoRapido([FromBody] CreateAtajoRapidoRequestDto request)
  {
    var validationResult = await _createValidator.ValidateAsync(request);
    if (!validationResult.IsValid)
    {
      return BadRequest(validationResult.Errors);
    }

    var nuevoAtajoRapido = new AtajoRapido
    {
      AliasPersonal = request.AliasPersonal,
      FrecuenciaUso = request.FrecuenciaUso,

      ComandoId = request.ComandoId
    };
    var creado = await _repository.AddAsync(nuevoAtajoRapido);

    var response = new AtajoRapidoResponseDto
    {

      Id = creado.Id,
      AliasPersonal = creado.AliasPersonal,
      FrecuenciaUso = creado.FrecuenciaUso,
      ComandoId = creado.ComandoId,

    };

    return CreatedAtAction(nameof(GetAtajosRapidos), new { id = response.Id }, response);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetAtajoRapidoById(int id)
  {

    var atajoRapido = await _repository.GetByIdAsync(id);

    if (atajoRapido == null)
      return NotFound(new { mensaje = "No se encontro una atajo rapido con el Id ingresado" });

    return Ok(new AtajoRapidoResponseDto
    {
      Id = atajoRapido.Id,
      AliasPersonal = atajoRapido.AliasPersonal,
      FrecuenciaUso = atajoRapido.FrecuenciaUso,
      ComandoId = atajoRapido.ComandoId,

    });
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateAtajoRapidoById(int id, [FromBody] UpdateAtajoRapidoRequestDto request)
  {
    // 1. Validar la petición con FluentValidation directamente
    var validationResult = await _updateValidator.ValidateAsync(request);
    if (!validationResult.IsValid)
    {
      return BadRequest(validationResult.Errors);
    }

    // 2. Buscar la entidad existente en la base de datos
    var atajoExistente = await _repository.GetByIdAsync(id);
    if (atajoExistente == null)
    {
      return NotFound(new { mensaje = "No se encontró un atajo rápido con el Id ingresado." });
    }

    // 3. Actualizar las propiedades de la entidad trazada con los datos del DTO
    atajoExistente.AliasPersonal = request.AliasPersonal;
    atajoExistente.FrecuenciaUso = request.FrecuenciaUso;
    atajoExistente.ComandoId = request.ComandoId;

    try
    {
      // 4. Guardar los cambios (dependiendo de cómo manejes UpdateByIdAsync)
      await _repository.UpdateByIdAsync(id, atajoExistente);
    }
    catch (DbUpdateConcurrencyException)
    {
      var existe = await _repository.GetByIdAsync(id) != null;
      if (!existe)
      {
        return NotFound(new { mensaje = "No se pudo actualizar. El atajo rápido fue eliminado por otro usuario." });
      }
      else
      {
        throw;
      }
    }

    // 5. Retornar la respuesta con el DTO
    return Ok(new AtajoRapidoResponseDto
    {
      Id = atajoExistente.Id,
      AliasPersonal = atajoExistente.AliasPersonal,
      FrecuenciaUso = atajoExistente.FrecuenciaUso,
      ComandoId = atajoExistente.ComandoId
    });
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteAtajoRapidoById(int id)
  {

    var atajoRapidoEliminado = await _repository.DeleteByIdAsync(id);

    if (atajoRapidoEliminado == null)
    {
      return NotFound(new { mensaje = "No se encontro la atajoRapido" });
    }

    return Ok(new AtajoRapidoResponseDto
    {

      Id = atajoRapidoEliminado.Id,
      AliasPersonal = atajoRapidoEliminado.AliasPersonal,
      FrecuenciaUso = atajoRapidoEliminado.FrecuenciaUso,
      ComandoId = atajoRapidoEliminado.ComandoId,
    });
  }
}
