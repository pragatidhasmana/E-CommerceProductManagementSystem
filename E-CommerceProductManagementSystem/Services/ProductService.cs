using E_CommerceProductManagementSystem.DTO;
using E_CommerceProductManagementSystem.Models;
using E_CommerceProductManagementSystem.Repositories;
using E_CommerceProductManagementSystem.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<IEnumerable<ProductDTO>> GetAllProducts()
    {
        var products = await _productRepository.GetAllProducts();
        return products.Select(p => new ProductDTO
        {
            ProductId = p.ProductId,
            Name = p.Name,
            Description = p.Description,
            Price = p.Price,
            Stock = p.Stock,
            ImgURL = p.ImgURL,
            CategoryId = p.CategoryId,
            CategoryName = p.Category?.Name
        }).ToList();
    }

    public async Task<ProductDTO> GetProductById(int id)
    {
        var product = await _productRepository.GetProductById(id);
        if (product == null) return null;

        return new ProductDTO
        {
            ProductId = product.ProductId,
            Name = product.Name,
            Description = product.Description,
            Price = product.Price,
            Stock = product.Stock,
            ImgURL= product.ImgURL,
            CategoryId = product.CategoryId,
            CategoryName = product.Category?.Name
        };
    }

    public async Task<ProductDTO> AddProduct(ProductDTO productDTO)
    {
        var product = new Product
        {
            Name = productDTO.Name,
            Description = productDTO.Description,
            Price = productDTO.Price,
            ImgURL =    productDTO.ImgURL,
            Stock = productDTO.Stock,
            CategoryId = productDTO.CategoryId
        };

        var createdProduct = await _productRepository.AddProduct(product);

        return new ProductDTO
        {
            ProductId = createdProduct.ProductId,
            Name = createdProduct.Name,
            Description = createdProduct.Description,
            Price = createdProduct.Price,
            ImgURL = createdProduct.ImgURL,
            Stock = createdProduct.Stock    ,
            CategoryId = createdProduct.CategoryId
        };
    }

    public async Task<ProductDTO> UpdateProduct(int id, ProductDTO productDTO)
    {
        var product = await _productRepository.GetProductById(id);
        if (product == null) return null;

        product.Name = productDTO.Name;
        product.Description = productDTO.Description;
        product.Price = productDTO.Price;
        product.Stock = productDTO.Stock;
        product.CategoryId = productDTO.CategoryId;

        if(!string.IsNullOrEmpty(productDTO.ImgURL))
        {
            product.ImgURL = productDTO.ImgURL;
        }       

        var updatedProduct = await _productRepository.UpdateProduct(product);

        return new ProductDTO
        {
            ProductId = updatedProduct.ProductId,
            Name = updatedProduct.Name,
            Description = updatedProduct.Description,
            Price = updatedProduct.Price,
            Stock = updatedProduct.Stock    ,
            ImgURL= updatedProduct.ImgURL,
            CategoryId = updatedProduct.CategoryId
        };
    }

    public async Task<bool> DeleteProduct(int id)
    {
        return await _productRepository.DeleteProduct(id);
    }
}
