using Models;
using Repositories;
using DTOs;

public interface IAuthService
{
    Task<AuthResponse> SignUp(AuthRequest request);
    Task<AuthResponse> SignIn(AuthRequest request);
}

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;

    public AuthService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<AuthResponse> SignUp(AuthRequest request)
    {
        var existingUser = await _userRepository.GetUserByUsername(request.Username);
        if (existingUser != null)
        {
            throw new Exception("Username already exists.");
        }

        var user = new User { Username = request.Username };
        var createdUser = await _userRepository.CreateUser(user);

        var token = GenerateToken(createdUser);

        return new AuthResponse
        {
            UserId = createdUser.Id,
            Username = createdUser.Username,
            Token = token
        };
    }

    public async Task<AuthResponse> SignIn(AuthRequest request)
    {
        var user = await _userRepository.GetUserByUsername(request.Username);
        if (user == null)
        {
            throw new Exception("User not found.");
        }

        var token = GenerateToken(user);

        return new AuthResponse
        {
            UserId = user.Id,
            Username = user.Username,
            Token = token
        };
    }

    private string GenerateToken(User user)
    {
        return $"{user.Username}-token";
    }
}
