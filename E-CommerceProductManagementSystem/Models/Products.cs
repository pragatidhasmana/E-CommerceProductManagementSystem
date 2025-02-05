﻿using System.ComponentModel.DataAnnotations.Schema;

namespace E_CommerceProductManagementSystem.Models
{
    public class Products
    {
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int Stock {  get; set; }

        [ForeignKey("Category")]
        public int CategoryId { get; set; }

        public Category? Category { get; set; }

    }
}
