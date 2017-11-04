using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace vega.Models
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContextV2 dbContext;
        public VehicleRepository(VegaDbContextV2 dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true)
        {
            if(!includeRelated)
            {
                return await dbContext.Vehicles.FindAsync(id);
            }

            return await dbContext.Vehicles
                .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .SingleOrDefaultAsync(v => v.Id == id);
        }

        public void Add(Vehicle vehicle)
        {
            dbContext.Vehicles.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            dbContext.Vehicles.Remove(vehicle);
        }
    }
}