using System.ComponentModel.DataAnnotations;

namespace API_EXAMEN.Models
{
    public class Pedaje
    {
        [Key]
        public int idPedaje { get; set; }


        [Required]
        [StringLength(30, MinimumLength = 3, ErrorMessage = "El nombre ingresado supera el rango establecido.")]
        public string? nombre { get; set; }

        [Required]

        [StringLength(30, MinimumLength = 1, ErrorMessage = "El nombre ingresado supera el rango establecido.")]
        public string? idCategoria { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateOnly? fechaRegistro { get; set; }

        [Required]
        [Range(0.01, 100000.00)]
        public decimal? Price { get; set; }

    }
}
