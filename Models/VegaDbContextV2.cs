using Microsoft.EntityFrameworkCore;

namespace vega.Models
{
    public class VegaDbContextV2 : DbContext
    {
        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }
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