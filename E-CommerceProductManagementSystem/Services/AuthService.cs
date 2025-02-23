using E_CommerceProductManagementSystem.DTO;
using E_CommerceProductManagementSystem.Models;
using E_CommerceProductManagementSystem.Repositories;
using Microsoft.CodeAnalysis.Scripting;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace E_CommerceProductManagementSystem.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        //public bool IsUniqueUser(string userName)
        //{
        //    return _userRepository.IsUniqueUser(userName);
        //}

        public async Task<LoginResponseDTO> LoginUserAsync(UserLogin loginDto)
        {
            User user = null;

            LoginResponseDTO loginResponseDTO = null;


            if (!string.IsNullOrEmpty(loginDto.Username) && !string.IsNullOrEmpty(loginDto.Password))
            {
                user = await _userRepository.LoginUser(loginDto.Username, loginDto.Password);
            }
            
            if (user == null)
            {
                return loginResponseDTO;
            }

            loginResponseDTO = new LoginResponseDTO
            {
                token = GenerateJwtToken(user),
                Name = user.Name,
                Role = user.Role
            };

            return loginResponseDTO;
        }
        public async Task<UserRegistrationDTO> RegistrationAsync(UserRegistrationDTO registrationDTO)
        {
            bool user = _userRepository.IsUniqueUser(registrationDTO.UserName);
            if(!user)
            {
                return null;
            }
            User newUser = new User
            {
                Name = registrationDTO.Name,
                UserName = registrationDTO.UserName,
                Password = registrationDTO.Password,
                Role = registrationDTO.Role
            };
            await _userRepository.Registration(newUser);

            return new UserRegistrationDTO
            {
                UserName = newUser.UserName,
                Name = newUser.UserName,
                Role = newUser.Role
            };
        }

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),        
                new Claim(ClaimTypes.Role, user.Role)  // Adding role to claims
            };

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,

                expires: DateTime.UtcNow.AddHours(2),
                        signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

