using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Models;

namespace vega.Core.Models
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly VegaDbContextV2 dbContext;
        public PhotoRepository(VegaDbContextV2 dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<IEnumerable<Photo>> GetPhotosAsync(int vehicleId)
        {
            return await dbContext.Photos
                .Where(p => p.VehicleId == vehicleId)
                .ToListAsync();
        }
    }
}