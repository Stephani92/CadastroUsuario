using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pro.Repository.Repository;
using Pro_Domain.Entities;
using WebApi.Dtos;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class EventoController : ControllerBase
    {
        private readonly IBaseRepository _repo;
        private readonly IMapper _mapper;

        public EventoController(IBaseRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Get()
        {
           try
           {   
               var eventos = await _repo.GetAllEventoAsync(false);
               var results = _mapper.Map<IEnumerable<EventoDto>>(eventos);
               return Ok(results);
           }
           catch (System.Exception ex)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco falhou {ex.Message}");
           }
        }

        // upload
        [HttpPost("upload")]
        public async Task<IActionResult> Upload()
        {
           try
           {   
               var file = Request.Form.Files[0];
               var folderName =  Path.Combine("Resources", "Images");
               var pathSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
               if (file.Length > 0)
               {
                   var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName;
                   var fullPath = Path.Combine(pathSave, fileName.Replace("\"", " ").Trim());
                   using(var stream = new FileStream(fullPath, FileMode.Create)) {
                      await file.CopyToAsync(stream);
                   }
               }
               return Ok();
           }
           catch (System.Exception ex)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco falhou {ex.Message}");
           }
        }

        [HttpGet("{EventoId}")]
        public async Task<IActionResult> Get(int EventoId)
        {
           try
           {   
               var eventos = await _repo.GetEventoAsyncById(EventoId, false);
               var results = _mapper.Map<EventoDto>(eventos);
               return Ok(results);
           }
           catch (System.Exception ex)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco falhou {ex.Message}");
           }
        }
        [HttpGet("getByTema/{tema}")]
        public async Task<IActionResult> Get(string tema)
        {
           try
           {   
               var eventos = await _repo.GetAllEventoAsyncByTema(tema, false);
               var results = _mapper.Map<IEnumerable<EventoDto>>(eventos);
               return Ok(results);
           }
           catch (System.Exception ex)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco falhou {ex.Message}");
           }
        }

        [HttpPost]
        public async Task<IActionResult> Post(EventoDto model)
        {
           try
           {   var evento = _mapper.Map<Evento>(model);
               _repo.Add(evento);
               if (await _repo.SaveChangesAsync())
               {
                   return Created($"/api/evento/{model.Id}", _mapper.Map<EventoDto>(evento));   
               }
           }
           catch (System.Exception ex)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco falhou {ex.Message}");
           }
           return BadRequest();
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> Put(int id,EventoDto model)
        {
           try  
           {   
               var evento = await _repo.GetEventoAsyncById(id, true);
               if (evento == null) return NotFound();

               var idLotes = new List<int>();
               var idRedes = new List<int>();
                
                model.Lotes.ForEach(lote => idLotes.Add(lote.Id));               
                model.RedesSociais.ForEach(rede => idRedes.Add(rede.Id));
               

               var lotes = evento.Lotes.Where(
                   lote => !idLotes.Contains(lote.Id))
                                    .ToArray<Lote>();

               var redes = evento.RedesSociais.Where(
                   rede => !idRedes.Contains(rede.Id))
                                    .ToArray<RedeSocial>();
               

                if (idLotes.Count > 0)  _repo.DeleteRange(lotes);                
                if (idRedes.Count > 0)  _repo.DeleteRange(redes);
                
                _mapper.Map(model, evento);               
                _repo.Update(evento);   
                if (await _repo.SaveChangesAsync()) {
                    return Created($"/api/evento/{id}", _mapper.Map<EventoDto>(evento));   
                }
           }
           catch (System.Exception ex)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco falhou {ex.Message}");
           }
           return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
           try
           {    
               var evento = await _repo.GetEventoAsyncById(id, false);

               if (evento == null) return NotFound();
               _repo.Delete(evento);
               if (await _repo.SaveChangesAsync())
               {
                   return Ok();  
               }
           }
           catch (System.Exception)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
           }
           return BadRequest();
        }
    }
}