using Microsoft.EntityFrameworkCore;


namespace WarThunderForum.Models

{
    public class WarThunderContext : DbContext
    {
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<User> Users { get; set; }

        public WarThunderContext(DbContextOptions<WarThunderContext> options) : base(options)
        {

        }
        

    }
}
