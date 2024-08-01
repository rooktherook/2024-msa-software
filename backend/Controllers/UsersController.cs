using Microsoft.AspNetCore.Mvc;
using Repositories;
using Services;
using Models;
using DTOs;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _repository;
        private readonly IUserService _userService;
        private readonly IFavoriteFighterRepository _favoriteFighterRepository;

        public UsersController(IUserRepository repository, IUserService service, IFavoriteFighterRepository favoriteFighterRepository)
        {
            _repository = repository;
            _userService = service;
            _favoriteFighterRepository = favoriteFighterRepository;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] String username)
        {

            if (null != await _repository.GetUserByUsername(username))
            {
                return BadRequest(new { success = false, message = "Username already exists" });
            }

            await _userService.CreateUser(username);

            return Ok(new { success = true});
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] String username)
        {

            var existingUser = await _repository.GetUserByUsername(username);
            
            if (existingUser != null)
            {

                var dto = existingUser.ToDto();
                return Ok(new { success = true, user = dto });
            }

            return Unauthorized(new { success = false });
        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditUser([FromBody] UserDTO user)
        {
            var existingUser = await _repository.GetUserByUsername(user.Username);

            if (existingUser != null)
            {
                existingUser.Username = user.Username;
                existingUser.DisplayName = user.DisplayName;
                existingUser.AboutMe = user.AboutMe;

                await _repository.UpdateUser(existingUser);
                return Ok(new { success = true});
            }

            return Unauthorized(new { success = false });
        }

        [HttpPost("signout")]
        public IActionResult SignOut()
        {

            // doesn't rlly do anything, should just clear on the front end.
            return Ok(new { success = true });
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteUser([FromBody] String username)
        {
            var existingUser = await _repository.GetUserByUsername(username);

            if (existingUser != null)
            {
                await _favoriteFighterRepository.RemoveAllFavoritesByUserId(existingUser.Id);

                await _repository.DeleteUser(existingUser.Id);
                
                return Ok(new { success = true });
            }

            return Unauthorized(new { success = false });
        }
    }

}
