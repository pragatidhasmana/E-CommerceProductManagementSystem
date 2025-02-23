using E_CommerceProductManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace E_CommerceProductManagementSystem.Data
{
    public class ApplicationDbContext:DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed Categories
            modelBuilder.Entity<Category>().HasData(
                new Category { CategoryId = 1, Name = "Electronics" },
                new Category { CategoryId = 2, Name = "Books" },
                new Category { CategoryId = 3, Name = "Clothing" },
                new Category { CategoryId = 4, Name = "Kitchenware" }
            );

            // Seed Products
            modelBuilder.Entity<Product>().HasData(
                new Product { ProductId = 1, Name = "Laptop", Description = "Laptop", Price = 999.99m, Stock = 25, CategoryId = 1 },
                new Product { ProductId = 2, Name = "Smartphone", Description = "Mobile phone", Price = 499.99m, Stock = 7, CategoryId = 1 },
                new Product { ProductId = 3, Name = "Novel", Description = "Novel Fiction", Price = 19.99m, Stock = 15, CategoryId = 2 },
                new Product { ProductId = 4, Name = "T-Shirts", Description = "T-Shirts", Price = 200m, Stock = 45, CategoryId = 3 }
            );

            // Seed Users
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1,Name="Admin User", UserName = "Admin", Password = "password@123", Role = "Admin" },
                new User { Id = 2, Name = "Customer", UserName = "User", Password = "password@123", Role = "User" }
            );

        }
    }
}
