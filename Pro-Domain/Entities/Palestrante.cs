using System.Collections.Generic;

namespace Pro_Domain.Entities
{
    public class Palestrante
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string MiniCrriculo { get; set; }
        public string ImagemUrl { get; set; }
        public string Telefone { get; set; }
        public string Email { get; set; }
        public List<RedeSocial> RedesSociais { get; set; }
        public List<EventoPalestrante> EventoPalestrantes { get; set; }    
    }
}