using E_CommerceProductManagementSystem.DTO;

namespace E_CommerceProductManagementSystem.Services
{
        public interface ICategoryService
        {
            Task<IEnumerable<CategoryDTO>> GetAllCategories();
            Task<CategoryDTO> GetCategoryById(int id);
            Task<CategoryDTO> AddCategory(CategoryDTO categoryDTO);
            Task<CategoryDTO> UpdateCategory(int id, CategoryDTO categoryDTO);
            Task<bool> DeleteCategory(int id);
        }    
}
