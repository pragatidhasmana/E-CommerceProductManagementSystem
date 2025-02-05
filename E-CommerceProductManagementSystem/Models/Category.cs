namespace E_CommerceProductManagementSystem.Models
{
    public class Category
    {
        public int CategoryId {  get; set; }
        public string Name { get; set; } = string.Empty;
        public ICollection<Products> Products { get; set; }
    }
}
