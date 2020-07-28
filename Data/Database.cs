using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace ndso_bowling.Database
{
    public class DatabaseConnection : DbContext
    {
        public DatabaseConnection(DbContextOptions<DatabaseConnection> options)
            : base(options)
        { }


        public DbSet<Game> Games { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Athlete> Athletes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Game>().ToTable("Games");
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Athlete>().ToTable("Athletes");
        }
    }
}