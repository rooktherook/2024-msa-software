using Microsoft.AspNetCore.Mvc;
using DTOs;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> SignUp([FromBody] AuthRequest request)
    {
        var response = await _authService.SignUp(request);
        return Ok(response);
    }

    [HttpPost("signin")]
    public async Task<IActionResult> SignIn([FromBody] AuthRequest request)
    {
        var response = await _authService.SignIn(request);
        return Ok(response);
    }
}
