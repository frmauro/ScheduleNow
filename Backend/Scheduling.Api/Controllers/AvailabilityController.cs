using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Scheduling.Domain.Entities;
using Scheduling.Domain.Interfaces;
using System.Security.Claims;

namespace Scheduling.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AvailabilityController(IRepository<Availability> availabilityRepository) : ControllerBase
{
    private readonly IRepository<Availability> _availabilityRepository = availabilityRepository;

    private Guid GetTenantId() => Guid.Parse(User.Claims.First(c => c.Type == "TenantId").Value);

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Availability availability)
    {
        availability.TenantId = GetTenantId();
        await _availabilityRepository.AddAsync(availability);
        await _availabilityRepository.SaveChangesAsync();
        return Ok(availability);
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll([FromQuery] Guid tenantId, [FromQuery] Guid? employeeId)
    {
        var id = User.Identity?.IsAuthenticated == true ? GetTenantId() : tenantId;
        
        var availabilities = await _availabilityRepository.FindAsync(a => a.TenantId == id && (!employeeId.HasValue || a.EmployeeId == employeeId));
        return Ok(availabilities);
    }
}
