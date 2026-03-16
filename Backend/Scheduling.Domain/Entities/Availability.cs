namespace Scheduling.Domain.Entities;

public class Availability : Entity
{
    public Guid EmployeeId { get; set; }
    public Employee Employee { get; set; } = null!;
    
    public DayOfWeek DayOfWeek { get; set; }
    public TimeSpan StartTime { get; set; }
    public TimeSpan EndTime { get; set; }

    public Guid TenantId { get; set; }
    public Tenant Tenant { get; set; } = null!;
}
