using Models;
using Repositories;

namespace Repositories
{
    public interface IFavoriteFighterRepository
    {
        Task<IEnumerable<FavoriteFighter>> GetFavoritesByUserId(int userId);
        Task AddFavoriteFighter(FavoriteFighter favoriteFighter);
        Task RemoveFavoriteFighter(int userId, string fighterId);
        Task RemoveAllFavoritesByUserId(int userId);
    }

}