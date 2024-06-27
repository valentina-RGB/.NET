using System.ComponentModel.DataAnnotations;

namespace API_PEDAJE_V2.Models
{
    public class Peaje
    {
        [Key]
        public int idPeaje { get; set; }

        [Required]
        [StringLength(6 ,ErrorMessage ="El dato que ingresaste supera el rango establecido.")]
        public string placa {  get; set; }

        [Required]
        [StringLength(30, MinimumLength =3, ErrorMessage = "El dato que ingresaste supera el rango establecido.")]
        public string peaje { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3, ErrorMessage = "El dato que ingresaste supera el rango establecido.")]
        public string descripcion { get; set; }

        [Required]
        [StringLength(5, MinimumLength = 1, ErrorMessage = "El dato ingresado supera el rango establecido.")]
        public string idCategoria { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateOnly fechaRegistro { get; set; }

        [Required]
        [Range(0.01, 100000.00)]
        public decimal precio { get; set; }


    }
}
