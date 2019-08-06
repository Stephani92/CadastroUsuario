using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pro.Repository.Repository;
using Pro_Domain.Entities;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IBaseRepository _repo;

        public EventoController(IBaseRepository repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
           try
           {    ;
               var results = await _repo.GetAllEventoAsync(false);
               return Ok(results);
           }
           catch (System.Exception)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
           }
        }

        [HttpGet("{EvendoId}")]
        public async Task<IActionResult> Get(int EvendoId)
        {
           try
           {
               var results = await _repo.GetEventoAsyncById(EvendoId, true);
               return Ok(results);
           }
           catch (System.Exception)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
           }
        }
        [HttpGet("getByTema/{tema}")]
        public async Task<IActionResult> Get(string tema)
        {
           try
           {
               var results = await _repo.GetAllEventoAsyncByTema(tema, true);
               return Ok(results);
           }
           catch (System.Exception)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
           }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Evento model)
        {
           try
           {
               _repo.Add(model);
               if (await _repo.SaveChangesAsync())
               {
                   return Created($"/api/evento/{model.Id}", model);   
               }
           }
           catch (System.Exception)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
           }
           return BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> Put(int eventoId,Evento model)
        {
           try
           {    
               var evento = await _repo.GetEventoAsyncById(eventoId, false);
               if (model == null) return NotFound();
               _repo.Update(model);
               if (await _repo.SaveChangesAsync())
               {
                   return Created($"/api/evento/{model.Id}", model);   
               }
           }
           catch (System.Exception)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
           }
           return BadRequest();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int eventoId)
        {
           try
           {    
               var evento = await _repo.GetEventoAsyncById(eventoId, false);
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