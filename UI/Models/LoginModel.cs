// Models/User.cs
using System.ComponentModel.DataAnnotations;

namespace Management.Models
{
    public class UserLogin
    {
      
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        // [DataType(DataType.Password)]
        public string Password { get; set; }

    
    }
}
