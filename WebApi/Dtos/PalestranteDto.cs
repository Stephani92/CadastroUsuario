using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Dtos
{
    public class PalestranteDto
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage= "O {0} é obrigatório")]
        public string Nome { get; set; }
        public string MiniCrriculo { get; set; }
        public string ImagemUrl { get; set; }

        [Phone]
        public string Telefone { get; set; }

        [EmailAddress]
        public string Email { get; set; }
        public List<RedeSocialDto> RedesSociais { get; set; }
        public List<EventoDto> Evento { get; set; }
    }
}