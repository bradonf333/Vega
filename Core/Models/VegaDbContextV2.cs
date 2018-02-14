using Microsoft.EntityFrameworkCore;
using vega.Core.Models;

namespace vega.Models
{
    public class VegaDbContextV2 : DbContext
    {
        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public VegaDbContextV2(DbContextOptions<VegaDbContextV2> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<VehicleFeature>().HasKey(vf => new
            {
                vf.VehicleId,
                vf.FeatureId
            });
        }
    }
}