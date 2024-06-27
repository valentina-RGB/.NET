using System.ComponentModel.DataAnnotations;

namespace mvc_creamy.Models
{
    public class Categories
    {
        [Key]
        public int IdCategorie { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 5, ErrorMessage = "El dato ingresado supera el rango establecido. ")]
        public string? Description { get; set; }


        public DateOnly? Date { get; set; }

        [Range(1, 2, MaximumIsExclusive = true, MinimumIsExclusive = false, ErrorMessage = "El dato ingresado no es correcto")]
        public StateCaregorie? State { get; set; }

        public ICollection<Products>? Products { get; set; }

        public enum StateCaregorie
        {
            Activo,
            Inactivo
        }

    }
}
