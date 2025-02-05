using E_CommerceProductManagementSystem.Models;

namespace E_CommerceProductManagementSystem.Repositories
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllCategories();
        Task<Category> GetCategoryById(int id);
        Task<Category> AddCategory(Category product);
        Task<Category> UpdateCategory(Category product);
        Task<bool> DeleteCategory(int id);

    }
}
