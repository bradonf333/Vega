using Microsoft.EntityFrameworkCore;

namespace vega.Models
{
    public class VegaDbContextV2 : DbContext
    {
        public VegaDbContextV2(DbContextOptions<VegaDbContextV2> options) : base(options)
        {
            
        }

        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }
    }
}