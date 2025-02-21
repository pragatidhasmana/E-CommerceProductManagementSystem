using E_CommerceProductManagementSystem.Data;
using E_CommerceProductManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace E_CommerceProductManagementSystem.Repositories
{
    public class UserRepository: IUserRepository
    {

        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByEmailAsync(string userName)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == userName);
        }
    }
}
