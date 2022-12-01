import React, { Component, useEffect, useState, useRef } from 'react';
import '../../../src/custom.css'
import '../../../src/index.css'
import { CommentComponent } from '../Comment/CommentComponent';
import { PostContentComponent } from '../Post/PostContentComponent';
import { baseUrl } from '../BaseUrl/BaseUrl';
import { apiPost } from './ApiPost';


export function PostComponent(posts, getAllPosts, searchedWord, userLoggedIn) {

    
    async function AddCommentToPost(id) {

        console.log(id);
        let content = document.querySelector(`[data-id="comment-to-${id}"]`);
        let comment = content.value;
        if (comment != "") {
            console.log(comment);
            content.value = "";
            let data = {
                Content: comment,
                Id: id
            };
            await apiPost(`${baseUrl()}api/addComment`, data);

            getAllPosts();
        }
    }

    async function DeletePostById(id) {
        await fetch(`${baseUrl()}api/deletePost/${id}`)

        getAllPosts();
    }

    async function AddLikeToPost(id) {
        await fetch(`${baseUrl()}api/addLikeToPost/${id}/${sessionStorage.getItem('name')}`)
        getAllPosts();
    }

    async function AddDislikeToPost(id) {
        await fetch(`${baseUrl()}api/addDislikeToPost/${id}/${sessionStorage.getItem('name')}`)
        getAllPosts();
    }


    return (
        <div id="forAllPosts">
            {posts.map(post =>
                <div key={post.id} className="card post" data-id={post.id}>
                    <h2> {post.title} </h2>
                    {PostContentComponent(post.content, searchedWord)}
                    <h6> Likes: {post.likeCount}, Dislikes: {post.dislikeCount}, Comments: {post.commentList.length} </h6>
                    <div className="like-buttons">
                        <button className="add-like-btn" type="button" onClick={() => AddLikeToPost(post.id)} >Like</button>
                        <button className="add-dislike-btn" type="button" onClick={() => AddDislikeToPost(post.id)} >Dislike</button>
                    </div>
                    <div className="comment-input">
                        <input type="text" className="comment-text" placeholder="Write a new comment:" data-id={"comment-to-" + post.id} />
                    </div>

                    <div className="post-buttons">
                        <button className="add-comment-btn" type="button" onClick={() => AddCommentToPost(post.id)} >Add comment</button>
                        <button className="delete-post-btn" type="button" onClick={() => DeletePostById(post.id)} id={post.id}>Delete this post</button>
                    </div>
                    {CommentComponent(post, getAllPosts, userLoggedIn)}

                </div>
            )}
        </div>
    );
}