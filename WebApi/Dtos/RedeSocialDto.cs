using System.ComponentModel.DataAnnotations;

namespace WebApi.Dtos
{
    public class RedeSocialDto
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage= "O {0} é obrigatório")]
        public string Nome { get; set; }
        
        [Required(ErrorMessage= "O {0} é obrigatório")]

        public string Url { get; set; }
    }
}