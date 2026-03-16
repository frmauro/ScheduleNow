using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Scheduling.Domain.Entities;
using Scheduling.Domain.Interfaces;
using System.Security.Claims;

namespace Scheduling.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ServicesController(IRepository<Service> serviceRepository) : ControllerBase
{
    private readonly IRepository<Service> _serviceRepository = serviceRepository;

    private Guid GetTenantId() => Guid.Parse(User.Claims.First(c => c.Type == "TenantId").Value);

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Service service)
    {
        service.TenantId = GetTenantId();
        await _serviceRepository.AddAsync(service);
        await _serviceRepository.SaveChangesAsync();
        return Ok(service);
    }

    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll([FromQuery] Guid tenantId)
    {
        var id = User.Identity?.IsAuthenticated == true ? GetTenantId() : tenantId;
        var services = await _serviceRepository.FindAsync(s => s.TenantId == id);
        return Ok(services);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] Service service)
    {
        var existing = await _serviceRepository.GetByIdAsync(id);
        if (existing == null || existing.TenantId != GetTenantId()) return NotFound();

        existing.Name = service.Name;
        existing.Description = service.Description;
        existing.DurationMinutes = service.DurationMinutes;
        existing.Price = service.Price;

        _serviceRepository.Update(existing);
        await _serviceRepository.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var existing = await _serviceRepository.GetByIdAsync(id);
        if (existing == null || existing.TenantId != GetTenantId()) return NotFound();

        _serviceRepository.Remove(existing);
        await _serviceRepository.SaveChangesAsync();
        return NoContent();
    }
}
