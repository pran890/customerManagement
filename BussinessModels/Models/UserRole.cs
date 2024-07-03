// Models/User.cs
using System.ComponentModel.DataAnnotations;

namespace CRUD.Models
{
    public class UserRole
    {
        public int Id { get; set; }
        public int rId { get; set; }
         public int cId { get; set; }
        public int mId { get; set; }
     
    }
}
