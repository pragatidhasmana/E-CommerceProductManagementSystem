using System.ComponentModel.DataAnnotations;

namespace E_CommerceProductManagementSystem.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(10)]
        public string? UserName { get; set; }

        [Required]
        [MaxLength(100)]
        public string? Name { get; set; }

        [Required]
        [MaxLength(255)]
        public string? Password { get; set; } // Note: Use a secure method to store passwords in production

        [Required]
        [MaxLength(50)]
        public string? Role { get; set; }
     

    }
    
}
