using Piwo.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Piwo.Data
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Beer> Beers { get; set; }
        public DbSet<UserBeer> UserBeers { get; set; }
        public DbSet<BeerComment> BeerComments { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserBeer>()
                .HasKey(ub => new { ub.UserId, ub.BeerId });

            builder.Entity<UserBeer>()
                .HasOne(ub => ub.User)
                .WithMany(u => u.UserBeers)
                .HasForeignKey(ub => ub.UserId);

            builder.Entity<UserBeer>()
                .HasOne(ub => ub.Beer)
                .WithMany(b => b.UserBeers)
                .HasForeignKey(ub => ub.BeerId);

            builder.Entity<BeerComment>()
                .HasOne(bc => bc.User)
                .WithMany(u => u.BeerComments)
                .HasForeignKey(bc => bc.UserId);

            builder.Entity<BeerComment>()
                .HasOne(bc => bc.Beer)
                .WithMany(b => b.BeerComments)
                .HasForeignKey(bc => bc.BeerId);
        }
    }
}