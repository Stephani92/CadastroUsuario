using System.ComponentModel.DataAnnotations;

namespace WebApi.Dtos
{
    public class LoteDto
    {        
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        public decimal Preco { get; set; }

        [Range(5, 800, ErrorMessage = "Quantidade do lote entre 5 e 800.")]
        public int Quantidade { get; set; }
    }
}