using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Scheduling.Domain.Entities;
using Scheduling.Domain.Interfaces;

namespace Scheduling.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TenantsController(IRepository<Tenant> tenantRepository) : ControllerBase
{
    private readonly IRepository<Tenant> _tenantRepository = tenantRepository;

    [HttpPost]
    public async Task<IActionResult> CreateTenant([FromBody] Tenant tenant)
    {
        // Simple direct creation for MVP
        tenant.Slug = tenant.Name.ToLower().Replace(" ", "-");
        await _tenantRepository.AddAsync(tenant);
        await _tenantRepository.SaveChangesAsync();
        return Ok(tenant);
    }

    [HttpGet("{slug}")]
    [AllowAnonymous]
    public async Task<IActionResult> GetBySlug(string slug)
    {
        var tenant = (await _tenantRepository.FindAsync(t => t.Slug == slug)).FirstOrDefault();
        if (tenant == null) return NotFound();
        return Ok(tenant);
    }
}
