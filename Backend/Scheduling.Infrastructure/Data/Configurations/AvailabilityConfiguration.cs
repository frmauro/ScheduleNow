using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduling.Domain.Entities;

namespace Scheduling.Infrastructure.Data.Configurations;

public class AvailabilityConfiguration : IEntityTypeConfiguration<Availability>
{
    public void Configure(EntityTypeBuilder<Availability> builder)
    {
        builder.HasKey(a => a.Id);

        builder.HasOne(a => a.Employee)
               .WithMany(e => e.Availabilities)
               .HasForeignKey(a => a.EmployeeId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(a => a.Tenant)
               .WithMany()
               .HasForeignKey(a => a.TenantId)
               .OnDelete(DeleteBehavior.Restrict);
    }
}
