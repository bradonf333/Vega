using System;
using System.ComponentModel.DataAnnotations;

namespace vega.Models
{
    public class Vehicle
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public Model Model { get; set; }
        public bool IsRegistered { get; set; }
        [Required]
        [MaxLength(255)]
        public string ContactName { get; set; }
        [MaxLength(255)]
        public string ContactEmail { get; set; }
        [Required]
        [MaxLength(255)]
        public string ContactPhone { get; set; }
        public DateTime LastUpdate { get; set; }
    }
}