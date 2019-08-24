using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Pro_Domain.Identity;

namespace Pro_Domain.Identity
{
    public class Role : IdentityRole<int>
    {
        public List<UserRole> UserRoles { get; set; }
    }
}