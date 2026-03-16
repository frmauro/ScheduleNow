using Scheduling.Domain.Enums;

namespace Scheduling.Domain.Entities;

public class Appointment : Entity
{
    public Guid ServiceId { get; set; }
    public Service Service { get; set; } = null!;

    public Guid EmployeeId { get; set; }
    public Employee Employee { get; set; } = null!;

    public string CustomerName { get; set; } = string.Empty;
    public string CustomerEmail { get; set; } = string.Empty;

    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }

    public AppointmentStatus Status { get; set; }

    public Guid TenantId { get; set; }
    public Tenant Tenant { get; set; } = null!;
}
