

using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Pro_Domain.Entities;

namespace Pro.Repository.Data
{
    public class ProDbContext:DbContext
    {   
        
        public ProDbContext(DbContextOptions<ProDbContext> options):base(options)
        {
            
        }
        [DatabaseGeneratedAttribute(DatabaseGeneratedOption.Identity)]
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Palestrante> Palestrantes { get; set; }
        public DbSet<Lote> Lotes { get; set; }
        public DbSet<RedeSocial> RedeSociais { get; set; }
        public DbSet<EventoPalestrante> EventoPalestrantes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<EventoPalestrante>()
            .HasKey(PE => new {
                PE.EventoId, PE.PalestranteId
            });
        }


    }
}