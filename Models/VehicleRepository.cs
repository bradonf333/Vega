using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Models;

namespace ProgrammingLog.Models
{
    public class VehicleRepository
    {
        private readonly VegaDbContextV2 dbContext;
        public VehicleRepository(VegaDbContextV2 dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<Vehicle> GetVehicleAsync(int id)
        {
            return await dbContext.Vehicles
                .Include(v => v.Features)
                    .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                    .ThenInclude(m => m.Make)
                .SingleOrDefaultAsync(v => v.Id == id);
        }
    }
}