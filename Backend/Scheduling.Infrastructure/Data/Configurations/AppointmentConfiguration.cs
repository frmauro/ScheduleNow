using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduling.Domain.Entities;

namespace Scheduling.Infrastructure.Data.Configurations;

public class AppointmentConfiguration : IEntityTypeConfiguration<Appointment>
{
    public void Configure(EntityTypeBuilder<Appointment> builder)
    {
        builder.HasKey(a => a.Id);
        builder.Property(a => a.CustomerName).IsRequired().HasMaxLength(150);
        builder.Property(a => a.CustomerEmail).IsRequired().HasMaxLength(150);
        builder.Property(a => a.Status).HasConversion<string>().HasMaxLength(50);

        builder.HasOne(a => a.Service)
               .WithMany()
               .HasForeignKey(a => a.ServiceId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(a => a.Employee)
               .WithMany(e => e.Appointments)
               .HasForeignKey(a => a.EmployeeId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(a => a.Tenant)
               .WithMany(t => t.Appointments)
               .HasForeignKey(a => a.TenantId)
               .OnDelete(DeleteBehavior.Restrict);
    }
}
