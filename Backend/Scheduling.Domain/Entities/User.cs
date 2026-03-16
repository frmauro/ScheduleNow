namespace Scheduling.Domain.Entities;

public class User : Entity
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string Role { get; set; } = "Customer"; // Admin, Employee, Customer
    
    public Guid? TenantId { get; set; }
    public Tenant? Tenant { get; set; }
}
