using Microsoft.AspNetCore.Mvc;
using WarThunderForum.Models.Entities;
using WarThunderForum.Services;

namespace WarThunderForum.Controllers
{
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly PostService _postService;

        public PostController(PostService postService)
        {
            _postService = postService;
        }

        [HttpGet("{id}")]
        [Route("[controller]/getPost/{id}")]
        public async Task<Post> GetPostById(int id)
        {
            return await _postService.GetPostById(id);
        }

    }
    
}
