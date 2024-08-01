using Microsoft.AspNetCore.Mvc;
using Repositories;
using Models;
using Request;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly IFavoriteFighterRepository _favoriteFighterRepository;
        private readonly IUserRepository _userRepository;
        private readonly IFighterRepository _fighterRepository;

        public FavoritesController(IFavoriteFighterRepository favoriteFighterRepository, IUserRepository userRepository, IFighterRepository fighterRepository)
        {
            _favoriteFighterRepository = favoriteFighterRepository;
            _fighterRepository = fighterRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetFavorites([FromQuery] string username)
        {

            var user = await _userRepository.GetUserByUsername(username);
            if (user == null)
            {
                return Unauthorized(new { success = false });
            }

            var favorites = await _favoriteFighterRepository.GetFavoritesByUserId(user.Id);

            if (favorites == null || !favorites.Any())
            {
                return Ok(new { success = true, favorites = new List<DTOs.FavoriteFighterDTO>() });
            }

            var dto = favorites.Select(f => f.ToDto());

            return Ok(new { success = true, favorites = dto });

        }

        [HttpPost("add")]
        public async Task<IActionResult> AddFavorite([FromBody] FavoriteFighterRequest favoriteFighterRequest)
        {      

            var username = favoriteFighterRequest.Username;
            var fighterId = favoriteFighterRequest.FighterId;

            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized(new { success = false });
            }

            var user = await _userRepository.GetUserByUsername(username);
            var fighter = await _fighterRepository.GetFighterById(fighterId);
            
            if (user == null || fighter == null)
            {
                return Unauthorized(new { success = false });
            }

            var newFavorite = new FavoriteFighter
            {
                UserId = user.Id,
                FighterId = fighter.Id
            };

            await _favoriteFighterRepository.AddFavoriteFighter(newFavorite);
            return Ok(new { success = true });
        }

        [HttpPost("remove")]
        public async Task<IActionResult> RemoveFavorite([FromBody] FavoriteFighterRequest favoriteFighterRequest)
        {
            var username = favoriteFighterRequest.Username;
            var fighterId = favoriteFighterRequest.FighterId;

            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized(new { success = false });
            }

            var user = await _userRepository.GetUserByUsername(username);
            if (user == null)
            {
                return Unauthorized(new { success = false });
            }

            await _favoriteFighterRepository.RemoveFavoriteFighter(user.Id, fighterId);
            return Ok(new { success = true });
        }
    }

}
