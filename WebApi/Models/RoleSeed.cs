using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Pro_Domain.Identity;

namespace WebApi.Models
{
    public  class RoleSeed {

        public readonly RoleManager<Role> _roleManager;
            public RoleSeed(RoleManager<Role> roleManager)
            {
                _roleManager = roleManager;
            }
        List<string> roles = new List<string>(){
            "admin",
            "userJr",
            "userSn"
        };

    //         public async IdentityResult RolesSeed()
    //     {

            

    //         try{   foreach (var role in roles){

                    
    //                 if (!await _roleManager.RoleExistsAsync(role)){


    //                 var create = await (_roleManager.CreateAsync(new Role()){
    //                     Name = role
    //                 });

    //                 if (!create.Succeeded){

    //                     throw new Exception("Failed to create role");

    //                 }                     
    //             }
                
    //         }
    //         }
    //         catch (System.Exception ex)
    //         {
    //             throw new Exception($"{ex.Message}");

    //         }
    //     }
    // }
    }
}

