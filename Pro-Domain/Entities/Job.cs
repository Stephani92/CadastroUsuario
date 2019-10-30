using Pro_Domain.Identity;

namespace Pro_Domain.Entities
{
    public class Job
    {
        public Job()
        {
        }

        public int Id { get; set; }
        public int Hours { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}