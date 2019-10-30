using System;
using System.Threading.Tasks;
using Pro_Domain.Entities;

namespace Pro.Repository.Repository
{
    public interface IBaseRepository
    {   
        //Geral
         void Add<T>(T entity) where T:class;
         void Update<T>(T entity) where T:class;
         void Delete<T>(T entity) where T:class;
         void DeleteRange<T>(T[] entity) where T:class;
         Task<bool> SaveChangesAsync();
         //EVENTOS
        Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrantes);
        Task<Evento[]> GetAllEventoAsync(bool includePalestrantes);
        Task<Evento> GetEventoAsyncById(int EventoId, bool includePalestrantes);
        Task<Customer> GetCustomerAsyncById(int CustId);
        Task<Job> GetAllJobAsyncById(int x, int z);

        //PALESTRANTE
        Task<Palestrante[]> GetAllPalestrantesAsyncByName(string name, bool includeEventos);
        Task<Job[]> GetJobsAsyncByUser(int name);

        Task<Palestrante> GetAllPalestranteByIdAsync(int PalestranteId, bool includeEventos);
    }
}