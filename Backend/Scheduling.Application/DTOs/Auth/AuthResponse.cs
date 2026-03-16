namespace Scheduling.Application.DTOs.Auth;

public record AuthResponse(
    Guid UserId,
    string Name,
    string Email,
    string Role,
    Guid? TenantId,
    string Token
);
