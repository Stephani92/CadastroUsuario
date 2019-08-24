using Microsoft.AspNetCore.Identity;
using Pro_Domain.Entities;

namespace Pro_Domain.Identity
{
    public class UserRole: IdentityUserRole<int>
    {
        public User User { get; set; }  
        public Role Role { get; set; }
    }
}