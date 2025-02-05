using E_CommerceProductManagementSystem.Models;

namespace E_CommerceProductManagementSystem.DTO
{
    public class CategoryDTO
    {
        public string Name { get; set; } = string.Empty;
        public ICollection<Product>? Products { get; set; }
    


    }
}
