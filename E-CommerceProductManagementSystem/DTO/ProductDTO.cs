namespace E_CommerceProductManagementSystem.DTO
{
    public class ProductDTO
    {

        public int ProductId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }
        public string? ImgURL { get; set; }
        public int CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public IFormFile? file { get; set; }

    }
}
