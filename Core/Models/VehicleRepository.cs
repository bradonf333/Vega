using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core.Models;
using vega.Extensions;

namespace vega.Models {
    public class VehicleRepository : IVehicleRepository {
        private readonly VegaDbContextV2 dbContext;
        public VehicleRepository (VegaDbContextV2 dbContext) {
            this.dbContext = dbContext;
        }
        public async Task<Vehicle> GetVehicleAsync (int id, bool includeRelated = true) {

            if (!includeRelated) {
                return await dbContext.Vehicles.FindAsync (id);
            }

            return await dbContext.Vehicles
                .Include (v => v.Features)
                .ThenInclude (vf => vf.Feature)
                .Include (v => v.Model)
                .ThenInclude (m => m.Make)
                .SingleOrDefaultAsync (v => v.Id == id);
        }

        public async Task<IEnumerable<Vehicle>> GetVehiclesAsync (VehicleQuery queryObj) {
            var query = dbContext.Vehicles
                .Include (v => v.Model)
                .ThenInclude (m => m.Make)
                .Include (v => v.Features)
                .ThenInclude (vf => vf.Feature)
                .AsQueryable ();

            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>> > () {

                    ["make"] = v => v.Model.Make.Name,
                    ["model"] = v => v.Model.Name,
                    ["contactName"] = v => v.ContactName
                };

            query = query.ApplyOrdering(queryObj, columnsMap);

            return await query.ToListAsync ();

        }

        public void Add (Vehicle vehicle) {
            dbContext.Vehicles.Add (vehicle);
        }

        public void Remove (Vehicle vehicle) {
            dbContext.Vehicles.Remove (vehicle);
        }
    }
}