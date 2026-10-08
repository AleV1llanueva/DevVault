
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using DevVault.Application.Interfaces;
using DevVault.Domain.Entities;
using DevVault.Application.Features.Comandos.DTOs;
using Microsoft.EntityFrameworkCore;

namespace DevVault.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ComandosController : ControllerBase
{
  private readonly IComandoRepository _repository;
  private readonly IValidator<CreateComandoRequestDto> _createValidator;
  private readonly IValidator<UpdateComandoRequestDto> _updateValidator;

  public ComandosController(
    IComandoRepository repository,
    IValidator<CreateComandoRequestDto> createValidator,
    IValidator<UpdateComandoRequestDto> updateValidator)
  {
    _repository = repository;
    _createValidator = createValidator;
    _updateValidator = updateValidator;

  }

  [HttpGet]
  public async Task<IActionResult> GetComandos()
  {
    var comandos = await _repository.GetAllAsync();

    var response = comandos.Select(c => new ComandoResponseDto
    {
      Id = c.Id,
      Titulo = c.Titulo,
      ComandoText = c.ComandoText,
      Explicacion = c.Explicacion,
      CategoriaId = c.CategoriaId
    });

    return Ok(response);
  }

  [HttpPost]
  public async Task<IActionResult> CrearComando([FromBody] CreateComandoRequestDto request)
  {
    var validationResult = await _createValidator.ValidateAsync(request);
    if (!validationResult.IsValid)
    {
      return BadRequest(validationResult.Errors);
    }

    var nuevoComando = new Comando
    {
      Titulo = request.Titulo,
      ComandoText = request.ComandoText,
      Explicacion = request.Explicacion,

      CategoriaId = request.CategoriaId
    };
    var creado = await _repository.AddAsync(nuevoComando);

    var response = new ComandoResponseDto
    {

      Id = creado.Id,
      Titulo = creado.Titulo,
      ComandoText = creado.ComandoText,
      Explicacion = creado.Explicacion,

      CategoriaId = creado.CategoriaId
    };

    return CreatedAtAction(nameof(GetComandos), new { id = response.Id }, response);
  }

  [HttpGet("{id}")]
  public async Task<IActionResult> GetComandoById(int id)
  {

    var comando = await _repository.GetByIdAsync(id);

    if (comando == null)
      return NotFound(new { mensaje = "No se encontro una Categoría con el Id ingresado" });

    return Ok(new ComandoResponseDto
    {
      Id = comando.Id,
      Titulo = comando.Titulo,
      ComandoText = comando.ComandoText,
      Explicacion = comando.Explicacion,

      CategoriaId = comando.CategoriaId
    });
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpdateComandoById(int id, [FromBody] UpdateComandoRequestDto request)
  {
    var validationResult = await _updateValidator.ValidateAsync(request);
    if (!validationResult.IsValid)
    {
      return BadRequest(validationResult.Errors);
    }

    var comandoExistente = await _repository.GetByIdAsync(id);
    if (comandoExistente == null)
    {
      return NotFound(new { mensaje = "No se encontro ningun comando" });
    }

    comandoExistente.Titulo = request.Titulo;
    comandoExistente.ComandoText = request.ComandoText;
    comandoExistente.Explicacion = request.Explicacion;
    comandoExistente.CategoriaId = request.CategoriaId;

    try
    {
      await _repository.UpdateByIdAsync(id, comandoExistente);
    }
    catch
    {
      var existe = await _repository.GetByIdAsync(id) != null;
      if (!existe)
      {
        return NotFound(new { mensaje = "No se pudo actualizar. El comando fue cambiado o eliminado hace un momento" });
      }
      else
      {
        throw;
      }
    }

    return Ok(new ComandoResponseDto
    {
      Id = comandoExistente.Id,
      Titulo = comandoExistente.Titulo,
      ComandoText = comandoExistente.ComandoText,
      Explicacion = comandoExistente.Explicacion,
      CategoriaId = comandoExistente.CategoriaId
    });
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteComandoById(int id)
  {

    var comandoEliminado = await _repository.DeleteByIdAsync(id);

    if (comandoEliminado == null)
    {
      return NotFound(new { mensaje = "No se encontro la comando" });
    }

    return Ok(new ComandoResponseDto
    {

      Id = comandoEliminado.Id,
      Titulo = comandoEliminado.Titulo,
      ComandoText = comandoEliminado.ComandoText,
      Explicacion = comandoEliminado.Explicacion,

      CategoriaId = comandoEliminado.CategoriaId
    });
  }
}
