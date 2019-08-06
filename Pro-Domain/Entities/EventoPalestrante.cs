namespace Pro_Domain.Entities
{
    public class EventoPalestrante
    {
        public int PalestranteId { get; set; }
        public Palestrante Palestrante { get; set; }

        public int EventoId { get; set; }
        public Evento Evento { get; }
        

    }
}