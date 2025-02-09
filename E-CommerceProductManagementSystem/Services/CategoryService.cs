using E_CommerceProductManagementSystem.DTO;
using E_CommerceProductManagementSystem.Models;
using E_CommerceProductManagementSystem.Repositories;

namespace E_CommerceProductManagementSystem.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<IEnumerable<CategoryDTO>> GetAllCategories()
        {
            var categories = await _categoryRepository.GetAllCategories();
            return categories.Select(c => new CategoryDTO
            {
                Id = c.CategoryId,
                Name = c.Name
            }).ToList();
        }

        public async Task<CategoryDTO> GetCategoryById(int id)
        {
            var category = await _categoryRepository.GetCategoryById(id);
            if (category == null) return null;

            return new CategoryDTO
            {
                Id = category.CategoryId,
                Name = category.Name
            };
        }

        public async Task<CategoryDTO> AddCategory(CategoryDTO categoryDTO)
        {
            var category = new Category
            {
                Name = categoryDTO.Name
            };

            var createdCategory = await _categoryRepository.AddCategory(category);

            return new CategoryDTO
            {
                Id = createdCategory.CategoryId,
                Name = createdCategory.Name
            };
        }

        public async Task<CategoryDTO> UpdateCategory(int id, CategoryDTO categoryDTO)
        {
            var category = await _categoryRepository.GetCategoryById(id);
            if (category == null) return null;

            category.Name = categoryDTO.Name;

            var updatedCategory = await _categoryRepository.UpdateCategory(category);

            return new CategoryDTO
            {
                Id = updatedCategory.CategoryId,
                Name = updatedCategory.Name
            };
        }

        public async Task<bool> DeleteCategory(int id)
        {
            return await _categoryRepository.DeleteCategory(id);
        }
    }

}
