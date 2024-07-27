using Microsoft.EntityFrameworkCore;
using Models;
using Repositories;

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
            return await _context.Fighter.ToListAsync();
        }
    }
}
