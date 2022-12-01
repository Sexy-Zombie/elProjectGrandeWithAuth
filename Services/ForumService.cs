using WarThunderForum.Models;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Linq;
using WarThunderForum.Models.User;
using WarThunderForum.Models.Entities;

namespace WarThunderForum.Services
{
    public class ForumService
    {
        private readonly WarThunderContext _context;

        public ForumService(WarThunderContext context)
        {
            _context = context;
        }



        public async Task<List<Post>> GetAllPosts()
        {

            var result = await _context.Posts.Include(p => p.CommentList).ToListAsync();
            return result;
        }

        public async Task<Post> GetPost(int id)
        {

            return await _context.Posts.Where(p => p.Id == id).FirstOrDefaultAsync();

            /*foreach (var post in _context.Posts)
            {
                if (post.Id == id)
                {
                    return post;
                }
            }
            return null;*/
        }

        public async Task<Post> AddPost(Post post) // called
        {
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return post;
        }

        public async Task<Post> RemovePost(int id) // called
        {
            var postToRemove = await _context.Posts.Where(p => p.Id == id)
                .Include(p => p.CommentList).Include(p => p.DislikersList).Include(p => p.LikersList).FirstOrDefaultAsync();
                


            if (postToRemove.CommentList.Count != 0)
            {
                foreach (Comment comment in postToRemove.CommentList)
                {
                    _context.Comments.Remove(comment);
                }
            }

            _context.Posts.Remove(postToRemove);
            await _context.SaveChangesAsync();

            return postToRemove;
        }

        public async Task UpdatePost(Post post) // not needed yet
        {
            _context.Posts.Update(post);
            _context.SaveChanges();
        }

        private User GetUserByUsername(string userName)
        {
            foreach (var user in _context.Users)
            {
                if (user.Username == userName)
                {
                    return user;
                }
            }
            return null;
        }

        public async Task UpdatePostLikes(int id, bool like, string userName)
        {
            var user = GetUserByUsername(userName);
            
            var selectedPost = await GetPost(id);
            if (!selectedPost.DislikersList.Contains(user) && !like)
            {
                selectedPost.DislikersList.Add(user);
                if (!(selectedPost is null))
                {
                    selectedPost.DislikeCount++;
                }
            }
            else if (selectedPost.DislikersList.Contains(user) && !like)
            {
                selectedPost.DislikersList.Remove(user);
                if (!(selectedPost is null))
                {
                    selectedPost.DislikeCount--;
                }
            }
            else if (!selectedPost.LikersList.Contains(user) && like)
            {
                selectedPost.LikersList.Add(user);
                if (!(selectedPost is null))
                {
                    selectedPost.LikeCount++;
                }
            }
            else if (selectedPost.LikersList.Contains(user) && like)
            {
                selectedPost.LikersList.Remove(user);
                if (!(selectedPost is null))
                {
                    selectedPost.LikeCount--;
                }
            }
            await _context.SaveChangesAsync();
        }

        public async Task<Comment> AddCommentToPost(AddComment addComment)
        {

            Comment newComment = new Comment
            {
                Content = addComment.Content,
                LikeCount = 0,
                DislikeCount = 0
            };

            var postForComment = await _context.Posts.Where(p => p.Id == addComment.Id).FirstOrDefaultAsync();

            postForComment.CommentList.Add(newComment);

            await _context.SaveChangesAsync();

            return newComment;
        }

        public async Task AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
        }

        public async Task RemoveUser(int id)
        {
            _context.Users.Remove(await GetUser(id));
            _context.SaveChanges();
        }

        public async Task<User> GetUser(int id)
        {
            foreach (var user in _context.Users)
            {
                if (user.Id == id) return user;
            }
            return null;
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return _context.Users;
        }

        public async Task<Comment> DeleteCommentById(int id) 
        {
            var commentToRemove = await _context.Comments.Where(p => p.Id == id).Include(p => p.DislikersList).Include(p => p.LikersList).FirstOrDefaultAsync();
            _context.Comments.Remove(commentToRemove);
            await _context.SaveChangesAsync();

            return commentToRemove;
        }

        public async Task UpdateCommentLikes(int id, bool like, string userName)
        {
            var user = GetUserByUsername(userName);
            var selectedComment = await _context.Comments.Where(c => c.Id == id).FirstOrDefaultAsync();

            if (!selectedComment.DislikersList.Contains(user) && !like)
            {
                selectedComment.DislikersList.Add(user);
                if (!(selectedComment is null))
                {
                    selectedComment.DislikeCount++;
                }
            }
            else if (selectedComment.DislikersList.Contains(user) && !like)
            {
                selectedComment.DislikersList.Remove(user);
                if (!(selectedComment is null))
                {
                    selectedComment.DislikeCount--;
                }
            }
            else if (!selectedComment.LikersList.Contains(user) && like)
            {
                selectedComment.LikersList.Add(user);
                if (!(selectedComment is null))
                {
                    selectedComment.LikeCount++;
                }
            }
            else if (selectedComment.LikersList.Contains(user) && like)
            {
                selectedComment.LikersList.Remove(user);
                if (!(selectedComment is null))
                {
                    selectedComment.LikeCount--;
                }
            }
            await _context.SaveChangesAsync();
        }

        public async Task<Comment> GetCommentById(int id)
        {
            var selectedComment = await _context.Comments.Where(c => c.Id == id).FirstOrDefaultAsync();

            return selectedComment;

        }


        public async Task<List<Post>> SearchPostsByWord(string word)
        {
            var selectedPosts = await _context.Posts.Where(p => p.Content.Contains(word))
                .Include(p => p.CommentList).ToListAsync();

            return selectedPosts;
        }
    }
}
