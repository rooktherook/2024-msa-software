using Models;
using Repositories;

namespace Repositories
{
    public interface IFighterRepository
    {
        Task<IEnumerable<Fighter>> GetAllFighters();
    }
}