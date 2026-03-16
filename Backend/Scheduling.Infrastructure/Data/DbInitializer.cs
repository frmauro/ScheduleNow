using Microsoft.EntityFrameworkCore;
using Scheduling.Domain.Entities;

namespace Scheduling.Infrastructure.Data;

public static class DbInitializer
{
    public static async Task SeedAsync(AppDbContext context)
    {
        var adminEmail = "admin@schedulenow.com";
        
        if (await context.Tenants.AnyAsync())
        {
            // Auto-fix for existing admin user with invalid hash or old email
            var oldEmail = "admin@schedulemow.com";
            var adminUser = await context.Users.FirstOrDefaultAsync(u => u.Email == adminEmail || u.Email == oldEmail);
            
            if (adminUser != null)
            {
                bool changed = false;
                
                if (adminUser.Email == oldEmail)
                {
                    adminUser.Email = adminEmail;
                    changed = true;
                }
                
                if (adminUser.PasswordHash.StartsWith("AQAAAA") || !adminUser.PasswordHash.StartsWith("$2"))
                {
                    adminUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!");
                    changed = true;
                }
                
                if (changed)
                {
                    await context.SaveChangesAsync();
                }
            }
            return; 
        }

        // 1. Seed Tenant
        var tenant = new Tenant
        {
            Name = "Default Clinic",
            Slug = "default-clinic",
            Email = "contact@defaultclinic.com",
            Phone = "123456789"
        };
        context.Tenants.Add(tenant);

        // 2. Seed Admin User
        var admin = new User
        {
            Name = "Admin User",
            Email = adminEmail,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!"),
            Role = "Admin",
            Tenant = tenant
        };
        context.Users.Add(admin);

        // 3. Seed Services
        var service1 = new Service
        {
            Name = "General Consultation",
            Description = "Standard medical consultation",
            DurationMinutes = 30,
            Price = 100.00m,
            Tenant = tenant
        };
        var service2 = new Service
        {
            Name = "Deep Cleaning",
            Description = "Professional office cleaning",
            DurationMinutes = 60,
            Price = 150.00m,
            Tenant = tenant
        };
        context.Services.AddRange(service1, service2);

        // 4. Seed Employee
        var employee = new Employee
        {
            Name = "John Doe",
            Email = "john.doe@defaultclinic.com",
            Tenant = tenant,
            ServiceIds = [service1.Id, service2.Id]
        };
        context.Employees.Add(employee);

        // 5. Seed Availabilities
        var days = new[] { DayOfWeek.Monday, DayOfWeek.Tuesday, DayOfWeek.Wednesday, DayOfWeek.Thursday, DayOfWeek.Friday };
        foreach (var day in days)
        {
            context.Availabilities.Add(new Availability
            {
                Employee = employee,
                DayOfWeek = day,
                StartTime = new TimeSpan(9, 0, 0),
                EndTime = new TimeSpan(17, 0, 0),
                Tenant = tenant
            });
        }

        await context.SaveChangesAsync();
    }
}
