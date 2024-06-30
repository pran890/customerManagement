// Models/User.cs
using System.ComponentModel.DataAnnotations;

namespace Management.Models
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        public string? Name { get; set; }
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        // [DataType(DataType.Password)]
        // [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        // public string ConfirmPassword { get; set; }
         
             public string Role { get; set; }
    }
}
