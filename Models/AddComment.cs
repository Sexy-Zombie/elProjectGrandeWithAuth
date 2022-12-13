using System.ComponentModel.DataAnnotations.Schema;

namespace WarThunderForum.Models
{
    public class AddComment
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Content { get; set; }
        public string Author { get; set; }

    }
}
