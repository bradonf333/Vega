using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Models;

namespace vega.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper mapper;
        private readonly VegaDbContextV2 dbContext;
        public VehiclesController(IMapper mapper, VegaDbContextV2 dbContext)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] VehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);

            vehicle.LastUpdate = DateTime.Now;

            dbContext.Vehicles.Add(vehicle);
            await dbContext.SaveChangesAsync();

            var vehicleResult = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(vehicleResult);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] VehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vehicle = await dbContext.Vehicles.Include(v => v.Features)
                .SingleOrDefaultAsync(v => v.Id == id);

            mapper.Map<VehicleResource, Vehicle>(vehicleResource, vehicle);

            vehicle.LastUpdate = DateTime.Now;

            await dbContext.SaveChangesAsync();

            var vehicleResult = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(vehicleResult);
        }
    }
}