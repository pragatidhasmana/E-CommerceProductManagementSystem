﻿using E_CommerceProductManagementSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace E_CommerceProductManagementSystem.Data
{
    public class AppDbContext:DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }        
    }
}
