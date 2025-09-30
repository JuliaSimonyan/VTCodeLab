using Microsoft.AspNetCore.Identity;

namespace VTC_CodeLab.Models
{
    public class ApplicationUser :IdentityUser
    {
        public string? FullName { get; set; }
        public string? Bio { get; set; }
        public string? AvatarUrl {get; set;}
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        //     public string Email { get; set; }   
    }
}
