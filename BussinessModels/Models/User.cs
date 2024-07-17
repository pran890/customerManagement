// Models/User.cs
using System.ComponentModel.DataAnnotations;

namespace CRUD.Models
{
    public class User
    {
        public int Id { get; set; }
          public int? FirstLogin { get; set; }
        public int rId { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        [EmailAddress]
        public string? Email { get; set; }

      
        public string Password { get; set; }

         
             public string Role { get; set; }
    }
}
