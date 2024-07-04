// Models/User.cs
using System.ComponentModel.DataAnnotations;

namespace CRUD.Models
{
    public class Privelage
    {
        public int pId { get; set; }
        public int rId { get; set; }
         public int ar { get; set; }
        public int mr { get; set; }
         public int cr { get; set; }
        public int er { get; set; }
    } 
}
