using System.Collections.Generic;

namespace Pro_Domain.Entities
{
    public class Evento
    {
        
        public int Id { get; set; }
        public string Tema { get; set; }
        public string Data { get; set; }    
        public string Telefone { get; set; }
        public string Email { get; set; }
        public int qtdPessoas { get; set; }
        public string Local { get; set; }
        public string ImgUrl { get; set; }
        public List<Lote> Lotes { get; set;}
        public List<RedeSocial> RedesSociais { get; set; }
        public List<EventoPalestrante> EventoPalestrantes { get; set; }
    }
}