namespace WarThunderForum.Models
{
    public class Post : BaseModel
    {
        public string Title { get; set; }
        public List<Comment> CommentList { get; set; } = new List<Comment>();
        public string Category { get; set; }
    }
}
