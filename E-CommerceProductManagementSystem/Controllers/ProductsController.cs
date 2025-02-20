using E_CommerceProductManagementSystem.DTO;
using E_CommerceProductManagementSystem.Services;
using E_CommerceProductManagementSystem.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetAllProducts()
    {
        var products = await _productService.GetAllProducts();
        return Ok(products);
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<IActionResult> GetProductById(int id)
    {
        var product = await _productService.GetProductById(id);
        if (product == null) return NotFound();
        return Ok(product);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> AddProduct( [FromForm] ProductDTO productDTO)
    {
        if (productDTO.file != null)
        {
            if (!string.IsNullOrEmpty(productDTO.ImgURL))
            {
                //delete old image
                new ImageUpload().DeleteFile(productDTO.ImgURL);
            }
            productDTO.ImgURL = new ImageUpload().Upload(productDTO.file);
            var createdProduct = await _productService.AddProduct(productDTO);
            return CreatedAtAction(nameof(GetProductById), new { id = createdProduct.ProductId }, createdProduct);
        }
        return BadRequest();
        
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateProduct(int id, [FromForm] ProductDTO productDTO)
    {
        if(productDTO.file != null)
        {
            var productFromDB = await _productService.GetProductById(id);
            if (!string.IsNullOrEmpty(productFromDB.ImgURL))
            {
                //delete old image
                new ImageUpload().DeleteFile(productFromDB.ImgURL);
            }
            productDTO.ImgURL = new ImageUpload().Upload(productDTO.file);
        }       

        var updatedProduct = await _productService.UpdateProduct(id, productDTO);
        if (updatedProduct == null) return NotFound();
        return Ok(updatedProduct);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var productFromDB = await _productService.GetProductById(id);
        if (!string.IsNullOrEmpty(productFromDB.ImgURL))
        {
            //delete old image
            new ImageUpload().DeleteFile(productFromDB.ImgURL);
        }

        var result = await _productService.DeleteProduct(id);
        if (!result) return NotFound();
        return NoContent();
    }
}
