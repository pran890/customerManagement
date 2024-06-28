
using System.ComponentModel.DataAnnotations;


namespace CRUD.Models
{
    public class Customer
    {
        public int Id { get; set; }

        [Required(AllowEmptyStrings = false, ErrorMessage = "Please Provide Name")]
        public string? Name { get; set; }
            public string? Email { get; set; }
        public int? ManagerId { get; set; }
        public int? CoordinatorId  { get; set; }
        public int? ExecutiveId  { get; set; }
    }
}