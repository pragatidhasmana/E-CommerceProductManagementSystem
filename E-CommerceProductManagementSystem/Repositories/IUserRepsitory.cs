using E_CommerceProductManagementSystem.Models;

namespace E_CommerceProductManagementSystem.Repositories
{
    public interface IUserRepository
    {
        Task<User> LoginUser(string userName,string password);
        Task<User> Registration(User user);
        bool IsUniqueUser(string userName);
    }
}



