using System.Threading.Tasks;

namespace vega.Models
{
    public interface IVehicleRepository
    {
         Task<Vehicle> GetVehicleAsync(int id, bool includeRelated = true);
         void Add(Vehicle vehicle);
         void Remove(Vehicle vehicle);
    }
}