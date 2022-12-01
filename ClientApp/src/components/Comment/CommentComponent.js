import React from 'react';
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

    async function DeleteComment(commentId) {
        await fetch(`${baseUrl()}api/deleteComment/${commentId}`)
        getAllPosts();
    }
    if (userLoggedIn == true) {
        return (
            <div className="comments">
                <h4>Comments</h4>
                {post.commentList.map((comment, index) =>
                    < div className="comment" key={index} >
                        <p className="comment-content"> {comment.content} </p>
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