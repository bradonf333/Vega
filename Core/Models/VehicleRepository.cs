using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core.Models;

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

                    ["contactName"] = v => v.ContactName,

                    ["id"] = v => v.Id
                };

            query = ApplyOrdering (queryObj, query, columnsMap);

            return await query.ToListAsync ();

        }

        private IQueryable<Vehicle> ApplyOrdering (
            VehicleQuery queryObj,
            IQueryable<Vehicle> query,
            Dictionary<string, Expression<Func<Vehicle, object>> > columnsMap
        ) {
            if (queryObj.IsSortAscending) {
                query = query.OrderBy (columnsMap[queryObj.SortBy]);
            } else {
                query = query.OrderByDescending (columnsMap[queryObj.SortBy]);
            }

            return query;
        }

        public void Add (Vehicle vehicle) {
            dbContext.Vehicles.Add (vehicle);
        }

        public void Remove (Vehicle vehicle) {
            dbContext.Vehicles.Remove (vehicle);
        }
    }
}