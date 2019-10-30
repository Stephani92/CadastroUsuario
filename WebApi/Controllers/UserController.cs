using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Pro.Repository.Repository;
using Pro_Domain.Entities;
using Pro_Domain.Identity;
using WebApi.Dtos;

namespace WebApi.Controllers
{   
    [Route("api/[controller]")]
    [ApiController]
    public class UserController: ControllerBase
    {
        private readonly IConfiguration _conf;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;

        private readonly IBaseRepository _repo;
        public UserController(IConfiguration conf,
                                UserManager<User> userManager,
                                SignInManager<User> signInManager,
                                IMapper mapper,
                                IBaseRepository repo)
        {
            _conf = conf;
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet("GetUser")]
        public async Task<IActionResult> GetUser(UserDto userDto) {
            
            return Ok(userDto);
        }

        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(UserDto userDto) { 
            try
            {
                var user = _mapper.Map<User>(userDto);
                var result = await _userManager.CreateAsync(user, userDto.Password);                

                if (result.Succeeded)
                {   
                    var userToReturn = _mapper.Map<UserDto>(user);
                    return Created("GetUser", userToReturn);
                }

                return BadRequest(result.Errors);
            }
            catch (System.Exception ex)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco falhou {ex.Message}");
           }
        }

        [HttpPost("addjob")]
        [AllowAnonymous]
        public async Task<IActionResult> AddJob(JobDto job){
            try
            {   
                var customer = await _repo.GetCustomerAsyncById(job.CustomerId);
                var User = await _userManager.FindByIdAsync(job.UserId);
                if(customer == null & User == null) NotFound();
                var resul = new Job(){
                    Hours = job.Hours,
                    Description = job.Description,
                    CustomerId = customer.Id,
                    UserId= User.Id
                };
                _repo.Add(resul);
                if (await _repo.SaveChangesAsync())
                {
                    return Created($"/api/user/{resul.CustomerId}", _mapper.Map<JobDto>(resul));   
                }
            }
            catch (System.Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco falhou {ex.Message}");
            }
            return BadRequest();
        }

        [HttpPost("getjobid")]
        [AllowAnonymous]
        public async Task<IActionResult> getjob(UC teste){
            try
                {   var result = await _repo.GetAllJobAsyncById(teste.CustomerId, teste.UserId);
                    if (result == null)NotFound();
                    
                    return Ok(result);   
                    
                }
                catch (System.Exception ex)
                {
                    return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco falhou {ex.Message}");
                }
        }
        [HttpGet("getjobUser/{x}")]
        [AllowAnonymous]
        public async Task<IActionResult> getjobByUser(int x){
            try
                {   var result = await  _repo.GetJobsAsyncByUser(x);
                    if (result == null)NotFound();
                    
                    return Ok(result);   
                    
                }
                catch (System.Exception ex)
                {
                    return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco falhou {ex.Message}");
                }
        }
        [HttpPost("getalljob")]
        [AllowAnonymous]
        public async Task<IActionResult> getAllJob(UC teste){
            try
                {   
                    var result = await _repo.GetAllJobAsyncById(teste.CustomerId, teste.UserId);
                    if (result == null)NotFound();
                    
                    return Ok(result);   
                    
                }
                catch (System.Exception ex)
                {
                    return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco falhou {ex.Message}");
                }
        }


        [HttpPost("addcust")]
        [AllowAnonymous]
        public async Task<IActionResult> Addcust(){
        try
           {   
                var result = new Customer();
               _repo.Add(result);
               if (await _repo.SaveChangesAsync())
               {
                   return Created($"/api/User/{result.Id}", _mapper.Map<CustDto>(result));   
               }
           }
           catch (System.Exception ex)
           {
               return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco falhou {ex.Message}");
           }
           return BadRequest();
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        
         
         public async Task<IActionResult> Login(UserLoginDto userLogin) {
             try
             {
                 var user = await _userManager.FindByNameAsync(userLogin.UserName);
                 var result = await _signInManager.CheckPasswordSignInAsync(user, userLogin.Password, false);

                 if (result.Succeeded)
                 {
                     var appUser = await _userManager.Users.FirstOrDefaultAsync(u => u.NormalizedUserName == userLogin.UserName.ToUpper());

                     var userToReturn = _mapper.Map<UserLoginDto>(appUser);

                     return Ok(
                         new {
                             token = GenerationJwToken(appUser).Result,
                             user = userToReturn
                         }
                     );
                 }

                 return Unauthorized();
             }
            catch (System.Exception ex) {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco falhou {ex.Message}");
            }
         }
        
        public async Task<string> GenerationJwToken(User user)
        {
            var claims = new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(user);
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }
    // erro
            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_conf.GetSection("AppSettings:Token").Value));
            

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);
            
            return tokenHandler.WriteToken(token);

        }
    }
}