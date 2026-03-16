using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Scheduling.Domain.Entities;
using Scheduling.Domain.Enums;
using Scheduling.Domain.Interfaces;
using System.Security.Claims;

namespace Scheduling.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AppointmentsController(IRepository<Appointment> appointmentRepository) : ControllerBase
{
    private readonly IRepository<Appointment> _appointmentRepository = appointmentRepository;

    private Guid GetTenantId() => Guid.Parse(User.Claims.First(c => c.Type == "TenantId").Value);

    [HttpPost]
    [AllowAnonymous] // Public can book
    public async Task<IActionResult> Create([FromBody] Appointment appointment)
    {
        // Must come from client if anonymous, otherwise from token
        if (User.Identity?.IsAuthenticated == true && appointment.TenantId == Guid.Empty)
        {
            appointment.TenantId = GetTenantId();
        }

        appointment.Status = AppointmentStatus.Scheduled;
        await _appointmentRepository.AddAsync(appointment);
        await _appointmentRepository.SaveChangesAsync();
        
        return Ok(appointment);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        // Only internal users can view all appointments
        var appointments = await _appointmentRepository.FindAsync(a => a.TenantId == GetTenantId());
        return Ok(appointments);
    }

    [HttpPut("{id}/cancel")]
    public async Task<IActionResult> Cancel(Guid id)
    {
        var existing = await _appointmentRepository.GetByIdAsync(id);
        if (existing == null || existing.TenantId != GetTenantId()) return NotFound();

        existing.Status = AppointmentStatus.Canceled;
        _appointmentRepository.Update(existing);
        await _appointmentRepository.SaveChangesAsync();
        
        return Ok(existing);
    }
}
