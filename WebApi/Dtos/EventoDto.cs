using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage= "O {0} é obrigatório")]
        public string Tema { get; set; }
        public string Data { get; set; }    

        [Phone]
        public string Telefone { get; set; }
        
        [EmailAddress]
        public string Email { get; set; }

        [Range(5, 800, ErrorMessage = "Quatidade de pessoas é entre 5 e 800.")]
        public int qtdPessoas { get; set; }

        [Required(ErrorMessage= "O {0} é obrigatório")]
        [StringLength(100, MinimumLength = 3, ErrorMessage = "Local é entre 3 e 100.")]
        public string Local { get; set; }
        public string ImgUrl { get; set; }
        public List<LoteDto> Lotes { get; set;}
        public List<RedeSocialDto> RedesSociais { get; set; }
        public List<PalestranteDto> Palestrantes { get; set; }
    }
}