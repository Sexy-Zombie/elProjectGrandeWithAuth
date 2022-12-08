using Microsoft.EntityFrameworkCore;
using WarThunderForum.Models;
using WarThunderForum.Models.Entities;

namespace WarThunderForum.Services
{
    public class PostService
    {
        private readonly WarThunderContext _context;

        public PostService(WarThunderContext context)
        {
            _context = context;
        }

        public async Task<Post?> GetPostById(int id)   //(duplicated)  this is in ForumService too
        {

            return await _context.Posts.Where(p => p.Id == id)
                .Include(p => p.CommentList)
                .FirstOrDefaultAsync();

        }

    }
}
