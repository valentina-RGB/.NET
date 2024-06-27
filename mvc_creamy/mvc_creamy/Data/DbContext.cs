using Microsoft.EntityFrameworkCore;
using mvc_creamy.Models;


namespace mvc_creamy.Data
{
    public partial class AplicationDbContext :DbContext
    {
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Categories> Categories { get; set; }

        public DbSet<Products> Products { get; set; }
        //public DbSet<User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Categories>(entity =>
            {
                entity.HasMany(p => p.Products)
                .WithOne(c => c.Categories)
                .OnDelete(DeleteBehavior.Cascade);
            });



        }
    }
}
