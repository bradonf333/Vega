using System.Threading.Tasks;

namespace vega.Models
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}