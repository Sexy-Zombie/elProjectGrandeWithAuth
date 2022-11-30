using Microsoft.AspNetCore.Mvc;
using WarThunderForum.Models;
using WarThunderForum.Services;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using WarThunderForum.Models.User;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WarThunderForum.Controllers
{

    [ApiController]
    public class ApiController : ControllerBase
    {
        private readonly ForumService _service;

        public ApiController(ForumService service)
        {
            _service = service;
        }


        [HttpGet]
        [Route("[controller]/getAllPost")]
        public async Task<List<Post>> GetAllPosts()
        {
            return await _service.GetAllPosts();
        }

        [Authorize]
        [HttpPost]
        [Route("[controller]/addPost")]
        public async Task<Post> AddPost([FromBody] Post newPost)
        {
            return await _service.AddPost(newPost);
        }

        [HttpDelete("{id}")]
        [Route("[controller]/deletePost/{id}")]
        public async Task<Post> DeletePostById(int id)
        {
            return await _service.RemovePost(id);
        }

        [HttpDelete("{id}")]
        [Route("[controller]/deleteComment/{id}")]
        public async Task<Comment> DeleteCommentById(int id)
        {
            return await _service.DeleteCommentById(id);
        }



        [HttpPut("{id}")]
        [Route("[controller]/addLikeToPost/{id}")]
        public async Task AddLikeToPostById(int id)
        {
            await _service.UpdatePostLikes(id, true);
        }

        [HttpPut("{id}")]
        [Route("[controller]/addDislikeToPost/{id}")]
        public async Task AddDislikeToPostById(int id)
        {
            await _service.UpdatePostLikes(id, false);
        }

        [HttpPost]
        [Route("[controller]/addComment")]
        public async Task<Comment> AddCommentToPost(AddComment addComment)
        {
            return await _service.AddCommentToPost(addComment);
        }

        [HttpPost]
        [Route("[controller]/addUser")]
        public async void AddUser(User user)
        {
            await _service.AddUser(user);

        }

        [HttpGet]
        [Route("[controller]/getUsers")]
        public async Task<IEnumerable<User>> GetUsers()
        {
            return await _service.GetAllUsers();
        }
        
        [HttpPut("{commentId}")]
        [Route("[controller]/addLikeToComment/{commentId}")]
        public async Task AddLikeToCommentId(int commentId)
        {
            await _service.UpdateCommentLikes(commentId, true);
        }

        [HttpPut("{commentId}")]
        [Route("[controller]/addDislikeToComment/{commentId}")]
        public async Task AddDislikeToCommentId(int commentId)
        {
            await _service.UpdateCommentLikes(commentId, false);
        }

        [HttpGet("{id}")]
        [Route("[controller]/getComment/{id}")]
        public async Task<Comment> GetCommentById(int id)
        {
            return await _service.GetCommentById(id);
        }

        
        [HttpGet("{word}")]
        [Route("[controller]/getPosts/{word}")]
        public async Task<List<Post>> SearchPostsByWord(string word)
        {
            return await _service.SearchPostsByWord(word);
        }
    }
}
