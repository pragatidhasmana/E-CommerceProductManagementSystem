using E_CommerceProductManagementSystem.DTO;

namespace E_CommerceProductManagementSystem.Services
{

    public interface IAuthService
    {
        Task<LoginResponseDTO> LoginUserAsync(UserLogin loginDto);
        Task<UserRegistrationDTO> RegistrationAsync(UserRegistrationDTO registrationDTO);
    }
}



