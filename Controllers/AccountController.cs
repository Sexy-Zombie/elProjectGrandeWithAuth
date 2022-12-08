using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WarThunderForum.Services;
using WarThunderForum.Models.User;
using WarThunderForum.Models.Entities;

namespace WarThunderForum.Controllers
{
    public class AccountController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserService _userService;

        public AccountController(IConfiguration configuration, UserService userService)
        {
            _configuration = configuration;
            _userService = userService;
        }

        [HttpPost]
        [Route("[controller]/createUser/")]
        public async Task<IActionResult> Register([FromBody] Registration registrationData)
        {
            if (await _userService.RegistrationIsValid(registrationData))
            {
                await _userService.CreateUser(registrationData);

                return Ok();

            }

            return Conflict();

        }

        [HttpPost]
        [Route("[controller]/loginUser/")]
        public async Task<IActionResult> Login([FromBody] Login loginData)
        {
            if (await _userService.LoginIsValid(loginData))
            {
                var claims = await _userService.CreateClaims(loginData);

                var expireTime = DateTime.UtcNow.AddHours(1);

                return Ok(new
                {
                    access_token = CreateToken(claims, expireTime),
                    expiresAt = expireTime,
                });
            }

            ModelState.AddModelError("Unauthorized", "You are not authorized to access the endpoint.");
            return Unauthorized(ModelState);

        }


        private string CreateToken(IEnumerable<Claim> claims, DateTime expiresAt)
        {
            var secretKey = Encoding.UTF8.GetBytes(_configuration.GetValue<string>("Jwt:Key"));

            var jwt = new JwtSecurityToken(
                claims: claims,
                notBefore: DateTime.UtcNow,
                expires: expiresAt,
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(secretKey),
                    SecurityAlgorithms.HmacSha256Signature
                )
            );

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }


        [HttpGet("{id}")]
        [Route("[controller]/getUser/{id}")]
        public async Task<User?> GetUserById(int id)
        {
            return await _userService.GetUserById(id);
        }


    }
}
