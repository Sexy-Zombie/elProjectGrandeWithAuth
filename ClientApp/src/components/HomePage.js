import React, { Component, useEffect, useState, useRef } from 'react';
import '../custom.css'
import '../index.css'
import { CommentComponent } from './CommentComponent';
import { SearchComponent } from './SearchComponent'
import { baseUrl } from './BaseUrl';
import { apiPost } from './ApiPost';


export function HomeComponent() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        document.title = "Home page";
        getAllPosts();
    }, [])

    async function getAllPosts(word) {

        if (word == null) {
            const response = await fetch(`${baseUrl()}api/getAllPost`)
            let actualData = await response.json();
            setPosts(actualData);
        }

        else {
            const response = await fetch(`${baseUrl()}api/getPosts/${word}`)
            let actualData = await response.json();
            setPosts(actualData);
        }
        
    }

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
        await fetch(`${baseUrl()}api/addLikeToPost/${id}`)
        getAllPosts();
    }

    async function AddDislikeToPost(id) {
        await fetch(`${baseUrl()}api/addDislikeToPost/${id}`)
        getAllPosts();
    }

    /*async function apiPost(url, payload) {
        let data = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        return await data.json()
    }*/

    function getUsername() {
        if (sessionStorage.getItem("name")) {
            return (
                <h5>Welcome, {sessionStorage.getItem("name")}</h5>
                )
        }
    }

    return (
        <div className="page-content cursor_shape">
            <div className="title">
                <h1>War Thunder Forum</h1>
            </div>
            {SearchComponent(getAllPosts)}
            <div className="add-post-block">
                {getUsername()}
                <a href="/add-post"><button className="add-post-btn" type="button">Add post</button></a>
            </div>
            <div id="forAllPosts">
                {posts.map(post =>
                    <div key={post.id} className="card post" data-id={post.id}>
                        <h2> {post.title} </h2>
                        <h3> {post.content} </h3>
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
                        {CommentComponent(post, getAllPosts)}
                        
                    </div>
                )}
            </div>
        </div>
    );
}