using E_CommerceProductManagementSystem.Models;

namespace E_CommerceProductManagementSystem.Repositories
{
    public interface IUserRepository
    {
        Task<User> GetUserByEmailAsync(string userName);
    }
}



