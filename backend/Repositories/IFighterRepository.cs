using Models;
using Repositories;

namespace Repositories
{
    public interface IFighterRepository
    {
        Task<IEnumerable<Fighter>> GetAllFighters();
        Task<IEnumerable<Rankings>> GetRankings();
        Task<Fighter> GetFighterById(string id);

    }
}