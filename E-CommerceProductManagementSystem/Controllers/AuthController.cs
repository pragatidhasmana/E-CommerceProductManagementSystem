using Microsoft.AspNetCore.Mvc;
using E_CommerceProductManagementSystem.DTO;
using E_CommerceProductManagementSystem.Services;

namespace E_CommerceProductManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin loginDto)
        {
            var response = await _authService.LoginUserAsync(loginDto);

            if (response == null)
            {
                return Unauthorized(new { message = "Invalid Credentials" });
            }

            return Ok(response);
        }

        [HttpPost("registration")]
        public async Task<IActionResult> Registration([FromBody] UserRegistrationDTO registrationDTO)
        {
            var newUser = await _authService.RegistrationAsync(registrationDTO);
            if(newUser == null)
            {
                return BadRequest("UserName already exists");
            }
            return Ok(newUser);
        }
    }
}

