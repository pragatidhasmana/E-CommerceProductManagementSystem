using E_CommerceProductManagementSystem.DTO;

namespace E_CommerceProductManagementSystem.Services
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDTO>> GetAllProducts();
        Task<ProductDTO> GetProductById(int id);
        Task<ProductDTO> AddProduct(ProductDTO productDTO);
        Task<ProductDTO> UpdateProduct(int id, ProductDTO productDTO);
        Task<bool> DeleteProduct(int id);
        Task<IEnumerable<ProductDTO>> GetProductByCategoryId(int categoryId);

    }
}
