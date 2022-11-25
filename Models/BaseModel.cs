using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations.Schema;

namespace WarThunderForum.Models
{
    public abstract class BaseModel
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? Content { get; set; }
        public int LikeCount { get; set; }
        public int DislikeCount { get; set; }
    }
}
