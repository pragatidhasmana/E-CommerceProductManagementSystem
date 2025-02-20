using E_CommerceProductManagementSystem.DTO;

namespace E_CommerceProductManagementSystem.Services
{

    public interface IAuthService
    {
        Task<string> LoginAsync(UserLogin loginDto);
    }
}



