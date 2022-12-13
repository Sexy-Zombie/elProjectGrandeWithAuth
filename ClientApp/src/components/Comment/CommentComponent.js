import React from 'react';
import { getUserFromJwt } from '../Authentication/authenticationUtils';
import { baseUrl } from '../BaseUrl/BaseUrl';

export function CommentComponent(post, getAllPosts, userLoggedIn) {

    async function AddLikeToComment(commentId) {
        await fetch(`${baseUrl()}api/addLikeToComment/${commentId}/${sessionStorage.getItem("name")}`)
        getAllPosts();
    }

    async function AddDislikeToComment(commentId) {
        await fetch(`${baseUrl()}api/addDislikeToComment/${commentId}/${sessionStorage.getItem("name")}`)
        getAllPosts();
    }

    async function getCommentById(commentId) {
        let response = await fetch(`https://localhost:44449/api/getComment/${commentId}`)
        return response.json()
    }

    async function DeleteComment(commentId) {
        let userData = getUserFromJwt()
        let comment = await getCommentById(commentId)
        if (userData.name == comment.author) {
            await fetch(`${baseUrl()}api/deleteComment/${commentId}`)
            getAllPosts();
        } else {
            alert("You can't delete this comment!")
        }
        
    }
    if (userLoggedIn == true) {
        return (
            <div className="comments">
                <h4>Comments</h4>
                {post.commentList.map((comment, index) =>
                    < div className="comment" key={index} >
                        <div className="comment-content"><h6 className="comment-author">{comment.author}:</h6> <p>{comment.content} </p></div>
                        <p className="comment-like-text">Likes: {comment.likeCount}, Dislikes: {comment.dislikeCount}</p>
                        <div className="comment-btns">
                            <button className="add-comment-like-btn" type="button" onClick={() => AddLikeToComment(comment.id)}>Like</button>
                            <button className="add-comment-dislike-btn" type="button" onClick={() => AddDislikeToComment(comment.id)}>Dislike</button>
                            <button className="delete-comment-btn" type="button" onClick={() => DeleteComment(comment.id)}>Delete Comment</button>
                        </div>
                    </div>
                )}
            </div>
        );
    } else {
        return (
            <div className="comments">
                <h4>Comments</h4>
                {post.commentList.map((comment, index) =>
                    < div className="comment" key={index} >
                        <p className="comment-content"> {comment.content} </p>
                        <p className="comment-like-text">Likes: {comment.likeCount}, Dislikes: {comment.dislikeCount}</p>
                        <div className="comment-btns">
                        </div>
                    </div>
                )}
            </div>
        );
    }
    
}