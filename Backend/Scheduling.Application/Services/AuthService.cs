using Scheduling.Application.DTOs.Auth;
using Scheduling.Application.Interfaces;
using Scheduling.Domain.Entities;
using Scheduling.Domain.Interfaces;

namespace Scheduling.Application.Services;

public class AuthService : IAuthService
{
    private readonly IRepository<User> _userRepository;
    private readonly ITokenService _tokenService;

    public AuthService(IRepository<User> userRepository, ITokenService tokenService)
    {
        _userRepository = userRepository;
        _tokenService = tokenService;
    }

    public async Task<AuthResponse> RegisterAsync(RegisterRequest request, CancellationToken cancellationToken = default)
    {
        var existingUser = (await _userRepository.FindAsync(u => u.Email == request.Email, cancellationToken)).FirstOrDefault();
        if (existingUser != null)
        {
            throw new Exception("Email is already in use."); // In a real app we would use custom exceptions
        }

        // Extremely basic password hashing (for MVP / demo purposes). Ideally use BCrypt or ASP.NET Identity PasswordHasher.
        var user = new User
        {
            Name = request.Name,
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password), 
            Role = request.TenantId.HasValue ? "Employee" : "Customer", // Simpler reasoning here, can be changed later
            TenantId = request.TenantId
        };
        
        // If they don't pass a tenant, maybe they are registering a new Tenant and we handle that differently.
        // For MVP: Tenant owner registers tenant -> creates Admin User.
        
        await _userRepository.AddAsync(user, cancellationToken);
        await _userRepository.SaveChangesAsync(cancellationToken);

        var token = _tokenService.GenerateToken(user);
        
        return new AuthResponse(user.Id, user.Name, user.Email, user.Role, user.TenantId, token);
    }

    public async Task<AuthResponse> LoginAsync(LoginRequest request, CancellationToken cancellationToken = default)
    {
        var user = (await _userRepository.FindAsync(u => u.Email == request.Email, cancellationToken)).FirstOrDefault();
        
        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
        {
            throw new Exception("Invalid email or password.");
        }

        var token = _tokenService.GenerateToken(user);

        return new AuthResponse(user.Id, user.Name, user.Email, user.Role, user.TenantId, token);
    }
}
