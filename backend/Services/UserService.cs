using Models;
using Repositories;
using System.Threading.Tasks;

namespace Services
{

    public class UserService:IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<User> CreateUser(string username)
        {
            var user = new User { Username = username , DisplayName = username, AboutMe = ""};
            return await _userRepository.CreateUser(user);
        }

        public async Task DeleteUser(int id)
        {
            await _userRepository.DeleteUser(id);
        }

        public async Task UpdateUser(User user)
        {
            await _userRepository.UpdateUser(user);
        }
    }
}