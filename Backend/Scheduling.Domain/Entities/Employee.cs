namespace Scheduling.Domain.Entities;

public class Employee : Entity
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    
    // Storing provided services ids as a simple array or string, or linking via many-to-many
    // The requirement says: ServiceIds. Let's make it a List<Guid>.
    public List<Guid> ServiceIds { get; set; } = new List<Guid>();

    public Guid TenantId { get; set; }
    public Tenant? Tenant { get; set; }

    public ICollection<Availability> Availabilities { get; set; } = new List<Availability>();
    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}
