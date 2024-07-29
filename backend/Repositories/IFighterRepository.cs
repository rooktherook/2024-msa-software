using Models;
using Repositories;

namespace Repositories
{
    public interface IFighterRepository
    {
        Task AddPrediction(Prediction prediction);
        Task<IEnumerable<Fighter>> GetAllFighters();
    }
}