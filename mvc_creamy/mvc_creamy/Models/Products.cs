using System.ComponentModel.DataAnnotations;

namespace mvc_creamy.Models
{
    public class Products
    {
        [Key]
        public int IdProduct { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3, ErrorMessage = "El nombre ingresado supera el rango establecido.")]
        public string? Name { get; set; }

        [Required]
        [Range(0, 1.00000, ErrorMessage = "La cantidad ingresada supera el rango establecido.")]
        public decimal? Price { get; set; }



        public Categories? Categories { get; set; }

    }
}
