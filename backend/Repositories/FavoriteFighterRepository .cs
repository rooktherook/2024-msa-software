using Microsoft.EntityFrameworkCore;
using Models;

namespace Repositories
{
    public class FavoriteFighterRepository : IFavoriteFighterRepository
    {
        private readonly DataContext _context;

        public FavoriteFighterRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<FavoriteFighter>> GetFavoritesByUserId(int userId)
        {
            return await _context.FavoriteFighters
                .Where(f => f.UserId == userId)
                .ToListAsync();
        }

        public async Task AddFavoriteFighter(FavoriteFighter favoriteFighter)
        {
            _context.FavoriteFighters.Add(favoriteFighter);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveFavoriteFighter(int userId, string fighterId)
        {
            var favoriteFighter = await _context.FavoriteFighters
                .FirstOrDefaultAsync(f => f.UserId == userId && f.FighterId == fighterId);
            if (favoriteFighter != null)
            {
                _context.FavoriteFighters.Remove(favoriteFighter);
                await _context.SaveChangesAsync();
            }
        }
        public async Task RemoveAllFavoritesByUserId(int userId)
        {
            var favorites = await _context.FavoriteFighters
                .Where(f => f.UserId == userId)
                .ToListAsync();

            _context.FavoriteFighters.RemoveRange(favorites);
            await _context.SaveChangesAsync();
        }

    }

}