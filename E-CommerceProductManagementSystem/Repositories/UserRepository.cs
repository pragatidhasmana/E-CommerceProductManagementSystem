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

        public async Task<User> LoginUser(string userName, string password)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.UserName.ToLower() == userName.ToLower() && u.Password == password);
        }

        public bool IsUniqueUser(string userName)
        {
            var user = _context.Users.FirstOrDefault(u=>u.UserName == userName);
            if(user == null)
            {
                return true;
            }
            return false;
        }

        public async Task<User> Registration(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            user.Password = "";
            return user;
        }
    }
}
