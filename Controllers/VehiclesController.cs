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
        private readonly IVehicleRepository repository;
        public VehiclesController(IMapper mapper, VegaDbContextV2 dbContext, IVehicleRepository repository)
        {
            this.repository = repository;
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vehicle = mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);

            vehicle.LastUpdate = DateTime.Now;

            vehicle = await repository.GetVehicleAsync(vehicle.Id);

            dbContext.Vehicles.Add(vehicle);
            await dbContext.SaveChangesAsync();

            var vehicleResult = mapper.Map<Vehicle, SaveVehicleResource>(vehicle);
            return Ok(vehicleResult);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vehicle = await repository.GetVehicleAsync(id);

            if (vehicle == null)
            {
                return NotFound();
            }

            mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);

            vehicle.LastUpdate = DateTime.Now;

            await dbContext.SaveChangesAsync();

            var vehicleResult = mapper.Map<Vehicle, SaveVehicleResource>(vehicle);
            return Ok(vehicleResult);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await dbContext.Vehicles.FindAsync(id);

            if (vehicle == null)
            {
                return NotFound();
            }

            dbContext.Remove(vehicle);
            await dbContext.SaveChangesAsync();

            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await repository.GetVehicleAsync(id);

            if (vehicle == null)
            {
                return NotFound();
            }

            var vehicleResource = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(vehicleResource);
        }
    }
}