using System.ComponentModel.DataAnnotations;

namespace E_CommerceProductManagementSystem.Models
{
    public class Category
    {
        [Key]
        public int CategoryId {  get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<Product>? Products { get; set; }
    }
}
