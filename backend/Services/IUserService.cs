using Models;

namespace Services
{

    public interface IUserService
    {
        Task<User> CreateUser(string username);
        Task DeleteUser(int id);
        Task UpdateUser(User user);
        
    }
}