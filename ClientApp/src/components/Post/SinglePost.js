import React, { Component, useEffect, useState, useRef } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../../src/custom.css'
import '../../../src/index.css'
import { CommentComponent } from '../Comment/CommentComponent';
import { baseUrl } from '../BaseUrl/BaseUrl';
import { AddCommentToPost, AddDislikeToPost, AddLikeToPost, DeletePostById } from '../Functions/Modifiers';


export function SinglePostComponent() {
    const navigate = useNavigate();

    let { singlePostId } = useParams();

    const [post, setPost] = useState();

    useEffect(() => {
        document.title = "Post page";
        getPost();
    }, [])


    async function getPost() {
        const response = await fetch(`${baseUrl()}Post/getPost/${singlePostId}`)
        let actualData = await response.json();
        setPost(actualData);
    }

    async function navigateToHome(postId) {
        DeletePostById(postId);
        navigate('/');
    }


    if (post === undefined) {
        return <>Still loading...</>;
    }


    if (sessionStorage.getItem('name') != null) {
        return (
            <div className="page-content cursor_shape">
                <div className="title">
                    <h1>Post {post.id}</h1>
                </div>
                <div className="card post" data-id={post.id}>
                    <div className="post-title">
                        <h4 className="post-author"> By: {post.username}</h4>
                        <div><h2> {post.title}</h2></div>
                    </div>
                    <h3>{post.content}</h3>
                    <h6> Likes: {post.likeCount}, Dislikes: {post.dislikeCount}, Comments: {post.commentList.length} </h6>
                    <div className="like-buttons">
                        <button className="add-like-btn" type="button" onClick={() => AddLikeToPost(post.id, getPost)} >Like</button>
                        <button className="add-dislike-btn" type="button" onClick={() => AddDislikeToPost(post.id, getPost)} >Dislike</button>
                    </div>
                    <div className="comment-input">
                        <input type="text" className="comment-text" placeholder="Write a new comment:" data-id={"comment-to-" + post.id} />
                    </div>
                    <div className="post-buttons">
                        <button className="add-comment-btn" type="button" onClick={() => AddCommentToPost(post.id, getPost)} >Add comment</button>
                        <button className="delete-post-btn" type="button" onClick={() => navigateToHome(post.id)} id={post.id}>Delete this post</button>
                    </div>

                    {CommentComponent(post, getPost, true)}
                </div>
            </div>
        );
    }

    else {
        return (
            <div className="page-content cursor_shape">
                <div className="title">
                    <h1>Post {post.id}</h1>
                </div>
                <div className="card post" data-id={post.id}>
                    <div className="post-title">
                        <h4 className="post-author"> By: {post.username}</h4>
                        <div><h2> {post.title}</h2></div>
                    </div>
                    <h6> Likes: {post.likeCount}, Dislikes: {post.dislikeCount}, Comments: {post.commentList.length} </h6>
                    <h3>{post.content}</h3>
                    <div className="comments">
                        <h4>Comments</h4>
                        {post.commentList.map((comment, index) =>
                            < div className="comment" key={index} >
                                <p className="comment-content"> {comment.content} </p>
                                <p className="comment-like-text">Likes: {comment.likeCount}, Dislikes: {comment.dislikeCount}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );

    }


}