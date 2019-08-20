using System.Collections.Generic;

namespace WebApi.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Tema { get; set; }
        public string Data { get; set; }    
        public string Telefone { get; set; }
        public string Email { get; set; }
        public int qtdPessoas { get; set; }
        public string Local { get; set; }
        public string ImgUrl { get; set; }
        public List<LoteDto> Lotes { get; set;}
        public List<RedeSocialDto> RedesSociais { get; set; }
        public List<PalestranteDto> Palestrantes { get; set; }
    }
}