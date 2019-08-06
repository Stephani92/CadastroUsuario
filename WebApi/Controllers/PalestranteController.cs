using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pro.Repository.Repository;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PalestranteController : ControllerBase
    {
        private readonly IBaseRepository _repo;

        public PalestranteController(IBaseRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("{PalestranteId}")]
        public async Task<IActionResult> Get(int PalestranteId)
        {
           try
           {   
               var results = await _repo.GetAllPalestranteByIdAsync(PalestranteId, false);
               return Ok(results);
           }
           catch (System.Exception)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
           }
        }

        [HttpGet("{PalestranteNome}")]
        public async Task<IActionResult> Get(string PalestranteNome)
        {
           try
           {
               var results = await _repo.GetAllPalestrantesAsyncByName(PalestranteNome, true);
               return Ok(results);
           }
           catch (System.Exception)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco Dados Falhou");
           }
        }
    }
}