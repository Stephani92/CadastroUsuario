using System;
using System.Collections.Generic;

namespace Pro_Domain.Entities
{
    public class Customer
    {
        public Customer()
        {
        }

        public int Id { get; set; }
        public List<Job> Jobs { get; set; }
    }
}