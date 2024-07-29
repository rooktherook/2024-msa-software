using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Models;

namespace Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<User> CreateUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> GetUserById(int id)
        {
            return await _context.Users.Include(u => u.FavoriteFighters).FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User> GetUserByUsername(string username)
        {
            return await _context.Users.Include(u => u.FavoriteFighters).FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task DeleteUser(int id)
        {
            var user = await GetUserById(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateUser(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task AddFavoriteFighter(FavoriteFighter favoriteFighter)
        {
            _context.FavoriteFighters.Add(favoriteFighter);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveFavoriteFighter(int userId, string fighterId)
        {
            var favoriteFighter = await _context.FavoriteFighters.FirstOrDefaultAsync(ff => ff.UserId == userId && ff.FighterId == fighterId);
            if (favoriteFighter != null)
            {
                _context.FavoriteFighters.Remove(favoriteFighter);
                await _context.SaveChangesAsync();
            }
        }
    }
}
