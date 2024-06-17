using API_EXAMEN.Models;
using Microsoft.EntityFrameworkCore;

namespace API_EXAMEN.Data
{
    public class AplicationDbContext :DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Pedaje> pedaje {get; set; }
    }
}
