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

        public UserController(IConfiguration conf,
                                UserManager<User> userManager,
                                SignInManager<User> signInManager,
                                IMapper mapper)
        {
            _conf = conf;
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
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