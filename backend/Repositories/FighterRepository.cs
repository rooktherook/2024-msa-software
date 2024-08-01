using Microsoft.EntityFrameworkCore;
using Models;

namespace Repositories
{
    public class FighterRepository : IFighterRepository
    {
        private readonly DataContext _context;

        public FighterRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Fighter>> GetAllFighters()
        {
            return await _context.Fighters.ToListAsync();
        }
        public async Task<IEnumerable<Rankings>> GetRankings()
        {
            return await _context.Ranks.ToListAsync();
        }
        public async Task<Fighter> GetFighterById(string id)
        {
            return await _context.Fighters.FirstOrDefaultAsync(f => f.Id == id);
        }

    }
}