using System.Threading.Tasks;

namespace vega.Models
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly VegaDbContextV2 dbContext;
        public UnitOfWork(VegaDbContextV2 dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task CompleteAsync()
        {
            await dbContext.SaveChangesAsync();
        }
    }
}