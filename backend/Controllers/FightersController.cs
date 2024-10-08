using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Repositories;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FightersController : ControllerBase
    {
        private readonly IFighterRepository _repository;

        public FightersController(IFighterRepository repository)
        {
            _repository = repository;
        }

        // GET: api/Fighters
        [HttpGet("/Fighters")]
        public async Task<ActionResult<IEnumerable<Fighter>>> GetFighters()
        {
            var fighters = await _repository.GetAllFighters();
            return Ok(fighters);
        }

        // GET: api/Rankings
        [HttpGet("/Rankings")]
        public async Task<ActionResult<IEnumerable<Rankings>>> GetRankings()
        {
            var rankings = await _repository.GetRankings();
            return Ok(rankings);
        }

    }
}