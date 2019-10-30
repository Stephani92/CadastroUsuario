using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Pro_Domain.Entities;

namespace Pro_Domain.Identity
{
    public class User : IdentityUser<int>
    {
        [Column(TypeName = "nvarchar(150)")]
        public string FullName { get; set; }
        public List<UserRole> UserRoles { get; set; }
        public List<Job> Jobs { get; set; }
    }
}