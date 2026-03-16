using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Scheduling.Domain.Entities;

namespace Scheduling.Infrastructure.Data.Configurations;

public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
{
    public void Configure(EntityTypeBuilder<Employee> builder)
    {
        builder.HasKey(e => e.Id);
        builder.Property(e => e.Name).IsRequired().HasMaxLength(150);
        builder.Property(e => e.Email).IsRequired().HasMaxLength(150);

        builder.HasOne(e => e.Tenant)
               .WithMany(t => t.Employees)
               .HasForeignKey(e => e.TenantId)
               .OnDelete(DeleteBehavior.Restrict);
    }
}
