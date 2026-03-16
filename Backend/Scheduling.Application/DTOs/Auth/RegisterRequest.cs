namespace Scheduling.Application.DTOs.Auth;

public record RegisterRequest(
    string Name,
    string Email,
    string Password,
    Guid? TenantId
);
