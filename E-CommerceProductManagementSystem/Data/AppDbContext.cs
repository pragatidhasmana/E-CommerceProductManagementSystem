using E_CommerceProductManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace E_CommerceProductManagementSystem.Data
{
    public class AppDbContext:DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { } 
    }
}
