using WarThunderForum.Models.Entities;

namespace WarThunderForum.Models
{
    public class Forum
    {
        public List<Post> Posts { get; set; }

        public Forum()
        {
            Posts = new List<Post>();
        }
    }
}
