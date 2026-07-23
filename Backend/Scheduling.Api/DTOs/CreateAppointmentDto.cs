namespace Scheduling.Api.DTOs;

public class CreateAppointmentDto
{
    public Guid ServiceId { get; set; }
    public Guid EmployeeId { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string CustomerEmail { get; set; } = string.Empty;
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public Guid TenantId { get; set; }
}
