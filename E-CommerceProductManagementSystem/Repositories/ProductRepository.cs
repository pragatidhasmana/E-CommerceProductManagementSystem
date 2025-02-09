using E_CommerceProductManagementSystem.Models;

namespace E_CommerceProductManagementSystem.Repositories
{
    public class ProductRepository : IProductRepository
    {
        public Task<Product> AddProduct(Product product)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteProduct(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Product>> GetAllProducts()
        {
            throw new NotImplementedException();
        }

        public Task<Product> GetProductById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Product> UpdateProduct(Product product)
        {
            throw new NotImplementedException();
        }
    }
}
