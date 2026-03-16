using Scheduling.Domain.Entities;

namespace Scheduling.Application.Interfaces;

public interface ITokenService
{
    string GenerateToken(User user);
}
