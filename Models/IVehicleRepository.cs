using System.Threading.Tasks;

namespace vega.Models
{
    public interface IVehicleRepository
    {
         Task<Vehicle> GetVehicleAsync(int id);
    }
}