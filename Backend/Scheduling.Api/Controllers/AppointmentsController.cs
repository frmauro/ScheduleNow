using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Scheduling.Api.DTOs;
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
    public async Task<IActionResult> Create([FromBody] CreateAppointmentDto dto)
    {
        var tenantId = dto.TenantId;
        // Se usuário logado não enviar, pegamos do payload logado
        if (User.Identity?.IsAuthenticated == true && tenantId == Guid.Empty)
        {
            tenantId = GetTenantId();
        }

        var appointment = new Appointment
        {
            ServiceId = dto.ServiceId,
            EmployeeId = dto.EmployeeId,
            CustomerName = dto.CustomerName,
            CustomerEmail = dto.CustomerEmail,
            StartTime = dto.StartTime,
            EndTime = dto.EndTime,
            TenantId = tenantId,
            Status = AppointmentStatus.Scheduled
        };

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
