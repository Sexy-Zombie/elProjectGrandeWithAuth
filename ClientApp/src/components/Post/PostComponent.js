import React, { Component, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../src/custom.css'
import '../../../src/index.css'
import { CommentComponent } from '../Comment/CommentComponent';
import { PostContentComponent } from '../Post/PostContentComponent';
import { baseUrl } from '../BaseUrl/BaseUrl';
import { apiPost } from './ApiPost';
import { getUserFromJwt } from '../Authentication/authenticationUtils';


export function PostComponent(posts, getAllPosts, searchedWord, navigateToPost, userLoggedIn) {

    const navigate = useNavigate();
    
    async function AddCommentToPost(id) {
        let userData = await getUserFromJwt()
        let content = document.querySelector(`[data-id="comment-to-${id}"]`);
        let comment = content.value;
        if (comment != "") {
            content.value = "";
            let data = {
                Content: comment,
                Id: id,
                Author: userData.name
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

    async function NavigateToUser(id) {
        navigate(`/user/${id}`);
    }


    return (
        <div id="forAllPosts">
            {posts.map(post =>
                <div key={post.id} className="card post" data-id={post.id}>
                    <div className="post-title">
                        <h4 className="post-author" onClick={() => NavigateToUser(post.userId)} > By: {post.username}</h4>
                        <div><h2> {post.title}</h2></div>
                        <button className="go-to-post-btn" type="button" onClick={() => navigateToPost(post.id)}>Go to this post</button>
                    </div>
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