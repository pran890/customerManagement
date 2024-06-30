using System.ComponentModel.DataAnnotations;

namespace CRUD.Models
{
    public class FollowUps
    {
        public int Id { get; set; }
         public int? uId { get; set; }
           public int? fId { get; set; }
        public string? Note { get; set; }
        public int? cId { get; set; }
        public string? FollowUpDate { get; set; }
        public string? time { get; set; }
        public int? status {get;set;}
    }
}
