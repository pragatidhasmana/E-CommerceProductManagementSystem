using E_CommerceProductManagementSystem.DTO;
using E_CommerceProductManagementSystem.Models;

namespace E_CommerceProductManagementSystem.Services
{

    public interface IAuthService
    {
        Task<LoginResponseDTO> LoginUserAsync(UserLogin loginDto);
        Task<UserRegistrationDTO> RegistrationAsync(UserRegistrationDTO registrationDTO);
    }
}



