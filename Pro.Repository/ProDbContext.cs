

using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Pro_Domain.Entities;
using Pro_Domain.Identity;

namespace Pro.Repository.Data
{
    public class ProDbContext: IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int> >
    {   
        
        public ProDbContext(DbContextOptions<ProDbContext> options):base(options)
        {
            
        }
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Palestrante> Palestrantes { get; set; }
        public DbSet<Lote> Lotes { get; set; }
        public DbSet<RedeSocial> RedeSociais { get; set; }
        public DbSet<EventoPalestrante> EventoPalestrantes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder){

            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<UserRole>(userRole => 
                {
                    userRole.HasKey(ur => new {ur.UserId, ur.RoleId});
                    userRole.HasOne(ur => ur.Role).WithMany(ur => ur.UserRoles).HasForeignKey(ur => ur.RoleId).IsRequired();
                    userRole.HasOne(ur => ur.User).WithMany(ur => ur.UserRoles).HasForeignKey(ur => ur.UserId).IsRequired();
                }
            );

            // n p/ n
            modelBuilder.Entity<EventoPalestrante>()
            .HasKey(PE => new {
                PE.EventoId, PE.PalestranteId
            });
        }


    }
}