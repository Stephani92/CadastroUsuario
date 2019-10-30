using Pro_Domain.Entities;
using Pro_Domain.Identity;

namespace WebApi.Dtos
{
    public class JobDto
    {
        public int Hours { get; set; }
        public string Description { get; set; }

        public int CustomerId { get; set; }
        public string UserId { get; set; }
    }
}