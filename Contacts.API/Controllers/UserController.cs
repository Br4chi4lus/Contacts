using Contacts.API.Models;
using Contacts.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Contacts.API.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;    
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();

            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById([FromRoute] int id)
        {
            var user = await _userService.GetUserById(id);

            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterUserDto registerUserDto)
        {
            var user = await _userService.RegisterUser(registerUserDto);

            return Created($"/api/users/{user.Id}", user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] LoginUserDto loginUserDto)
        {
            var token = await _userService.LoginUser(loginUserDto);

            return Ok(token);
        }
    }
}
