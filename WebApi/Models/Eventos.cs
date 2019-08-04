using System;

namespace WebApi.Models
{
    public class Eventos
    {
        public Guid EventosId { get; set; }
        public string Tema { get; set; }
        public string Data { get; set; }
        public string Lote { get; set; }
        public int qtdPessoas { get; set; }
        public string Local { get; set; }
    }
}