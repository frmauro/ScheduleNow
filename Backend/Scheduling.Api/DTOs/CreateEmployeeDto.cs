using System.ComponentModel.DataAnnotations;

namespace Scheduling.Api.DTOs;

public class CreateEmployeeDto
{
    [Required]
    [MaxLength(150)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [MaxLength(150)]
    public string Email { get; set; } = string.Empty;

    public List<Guid> ServiceIds { get; set; } = new();
}
