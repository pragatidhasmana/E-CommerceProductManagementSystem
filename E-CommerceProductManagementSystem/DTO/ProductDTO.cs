﻿namespace E_CommerceProductManagementSystem.DTO
{
    public class ProductDTO
    {
               
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Stock { get; set; }  

        public string? CategoryName { get; set; }

    }
}
