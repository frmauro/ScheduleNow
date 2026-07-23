using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Scheduling.Domain.Entities;
using Scheduling.Domain.Interfaces;
using System.Security.Claims;
using Scheduling.Api.DTOs;

namespace Scheduling.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class EmployeesController(IRepository<Employee> employeeRepository) : ControllerBase
{
    private readonly IRepository<Employee> _employeeRepository = employeeRepository;

    private Guid GetTenantId()
    {
        var tenantIdClaim = User.Claims.FirstOrDefault(c => c.Type == "TenantId");
        if (tenantIdClaim == null) throw new UnauthorizedAccessException("TenantId not found in token.");
        return Guid.Parse(tenantIdClaim.Value);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateEmployeeDto dto)
    {
        var employee = new Employee
        {
            Name = dto.Name,
            Email = dto.Email,
            ServiceIds = dto.ServiceIds,
            TenantId = GetTenantId()
        };
        await _employeeRepository.AddAsync(employee);
        await _employeeRepository.SaveChangesAsync();
        return Ok(employee);
    }

    [HttpGet]
    [AllowAnonymous] // Needed for public scheduling page
    public async Task<IActionResult> GetAll([FromQuery] Guid tenantId)
    {
        // For employees, we allow public get by passing the tenantId query param
        var id = User.Identity?.IsAuthenticated == true ? GetTenantId() : tenantId;
        var employees = await _employeeRepository.FindAsync(e => e.TenantId == id);
        return Ok(employees);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] CreateEmployeeDto dto)
    {
        var existing = await _employeeRepository.GetByIdAsync(id);
        if (existing == null || existing.TenantId != GetTenantId()) return NotFound();

        existing.Name = dto.Name;
        existing.Email = dto.Email;
        existing.ServiceIds = dto.ServiceIds;

        _employeeRepository.Update(existing);
        await _employeeRepository.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var existing = await _employeeRepository.GetByIdAsync(id);
        if (existing == null || existing.TenantId != GetTenantId()) return NotFound();

        _employeeRepository.Remove(existing);
        await _employeeRepository.SaveChangesAsync();
        return NoContent();
    }
}
