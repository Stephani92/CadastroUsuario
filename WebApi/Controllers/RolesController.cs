using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Pro_Domain.Identity;
using WebApi.Dtos;

namespace WebApi.Controllers
{   
    [Route("api/[controller]")]
    [ApiController]


    public class RolesController: ControllerBase
    {
        private readonly RoleManager<Role> _role;
        private readonly UserManager<User> _user;

        public RolesController(RoleManager<Role> roleManager,
                                UserManager<User> userManager)
        {
            _role = roleManager;
            _user = userManager;
        }

        
        // GET api/values
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public ActionResult<string> Get()
        {
           return "Success";
        }

        // GET api/values/5
        [HttpGet("{id}")]
        [Authorize(Roles = "userJr")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost("CreateRole")]
        [AllowAnonymous]
        public async Task<ActionResult> CreateRole(RoleDto roleDto)
        {
            try
            {
                var retorno = await _role.CreateAsync(new Role(){ Name = roleDto.Name });
                return Ok(retorno);
            }
            catch (System.Exception ex )
            {
               return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"ERROR {ex.Message}");
            }
        }

        [HttpPost("Updaterole")]
        public async Task<ActionResult> UpdateRole(UpdateUserRoleDto update)
        {
            try
            {
                var retorno = await _user.FindByEmailAsync(update.Email);
                if (retorno != null)
                {
                    if (update.Delete)
                    {
                        await _user.RemoveFromRoleAsync(retorno, update.Role);
                    } else 
                    {
                        await _user.AddToRoleAsync(retorno, update.Role);
                    }
                } else
                {
                    return Ok("Usuário não encontrado");
                }
                return Ok("Success");
            }
            catch (System.Exception ex )
            {
               return this.StatusCode(StatusCodes.Status500InternalServerError,
                    $"ERROR {ex.Message}");
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
        
    }
}