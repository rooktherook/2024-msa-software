using Models;
using Repositories;
using System.Threading.Tasks;

public interface IUserService
{
    Task<User> CreateUser(string username);
    Task<User> GetUserById(int id);
    Task DeleteUser(int id);
    Task UpdateUser(User user);
    Task AddFavoriteFighter(int userId, string fighterId);
    Task RemoveFavoriteFighter(int userId, string fighterId);
}

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<User> CreateUser(string username)
    {
        var user = new User { Username = username };
        return await _userRepository.CreateUser(user);
    }

    public async Task<User> GetUserById(int id)
    {
        return await _userRepository.GetUserById(id);
    }

    public async Task DeleteUser(int id)
    {
        await _userRepository.DeleteUser(id);
    }

    public async Task UpdateUser(User user)
    {
        await _userRepository.UpdateUser(user);
    }

    public async Task AddFavoriteFighter(int userId, string fighterId)
    {
        var favoriteFighter = new FavoriteFighter { UserId = userId, FighterId = fighterId };
        await _userRepository.AddFavoriteFighter(favoriteFighter);
    }

    public async Task RemoveFavoriteFighter(int userId, string fighterId)
    {
        await _userRepository.RemoveFavoriteFighter(userId, fighterId);
    }
}
