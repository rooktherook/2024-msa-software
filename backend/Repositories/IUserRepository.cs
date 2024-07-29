using Models;
using System.Threading.Tasks;

namespace Repositories
{
    public interface IUserRepository
    {
        Task<User> CreateUser(User user);
        Task<User> GetUserById(int id);
        Task<User> GetUserByUsername(string username);
        Task DeleteUser(int id);
        Task UpdateUser(User user);
        Task AddFavoriteFighter(FavoriteFighter favoriteFighter);
        Task RemoveFavoriteFighter(int userId, string fighterId);
    }
}
