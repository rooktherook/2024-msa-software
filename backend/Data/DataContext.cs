using Microsoft.EntityFrameworkCore;
using Models;


public class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    public DbSet<Prediction> Predictions { get; set; }
    public DbSet<Fighter> Fighters { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<FavoriteFighter> FavoriteFighters { get; set; }
    public DbSet<Listranking> Ranks { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
