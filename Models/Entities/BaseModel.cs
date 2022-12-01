using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations.Schema;
using WarThunderForum.Models;


namespace WarThunderForum.Models.Entities
{
    public abstract class BaseModel
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? Content { get; set; }
        public int LikeCount { get; set; }
        public int DislikeCount { get; set; }
        public List<User.User>? LikersList { get; set; } = new List<User.User>();
        public List<User.User>? DislikersList { get; set; } = new List<User.User>();
    }
}
