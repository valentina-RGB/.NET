using API_PEDAJE_V2.Models;
using Microsoft.EntityFrameworkCore;

namespace API_PEDAJE_V2.Data
{
  
        public class AplicationDbContext : DbContext
        {
            public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
            {
            }

        public DbSet<Peaje> peaje { get; set; }
        }
    
}
