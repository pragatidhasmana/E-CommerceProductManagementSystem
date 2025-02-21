using E_CommerceProductManagementSystem.Data;
using E_CommerceProductManagementSystem.Models;
using E_CommerceProductManagementSystem.Repositories;
using Microsoft.EntityFrameworkCore;

public class ProductRepository : IProductRepository
{
    private readonly ApplicationDbContext _context;

    public ProductRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Product>> GetAllProducts()
    {
        return await _context.Products.Include(p => p.Category).ToListAsync();
    }

    public async Task<Product> GetProductById(int id)
    {
        return await _context.Products.Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.ProductId == id);
    }

    public async Task<Product> AddProduct(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task<Product> UpdateProduct(Product product)
    {
        _context.Products.Update(product);
        await _context.SaveChangesAsync();
        return product;
    }

    public async Task<bool> DeleteProduct(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null) return false;

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return true;
    }
}
