import React, { Component, useEffect, useState, useRef } from 'react';
import '../../../src/custom.css'
import '../../../src/index.css'
import { CommentComponent } from '../Comment/CommentComponent';
import { SearchComponent } from '../Search/SearchComponent'
import { PostComponent } from '../Post/PostComponent'
import { baseUrl } from '../BaseUrl/BaseUrl';
import { } from '../Authentication/authenticationUtils';


export function HomeComponent(props) {

    let [searchedWord, setWord] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        document.title = "Home page";
        getAllPosts();
    }, [])

    async function getAllPosts(word) {

        if (word == null) {
            setWord("");
            const response = await fetch(`${baseUrl()}api/getAllPost`)
            let actualData = await response.json();
            setPosts(actualData);
        }

        else {
            setWord(word);
            const response = await fetch(`${baseUrl()}api/getPosts/${word}`)
            let actualData = await response.json();
            setPosts(actualData);
        }
        
    }
  

    if (props.userLoggedIn == true) {
        return (
            <div className="page-content cursor_shape">
                <div className="title">
                    <h1>War Thunder Forum</h1>
                </div>
                {SearchComponent(getAllPosts)}
                <div className="add-post-block">
                    <a href="/add-post"><button className="add-post-btn" type="button">Add post</button></a>
                </div>
                {PostComponent(posts, getAllPosts, searchedWord, props.userLoggedIn)}
            </div>
        );
    }
    else {
        return (
            <div className="page-content cursor_shape">
                <div className="title">
                    <h1>War Thunder Forum</h1>
                </div>
                {SearchComponent(getAllPosts)}
                <div id="forAllPosts">
                    {posts.map(post =>
                        <div key={post.id} className="card post" data-id={post.id}>
                            <h2> {post.title} </h2>
                            <h3> {post.content} </h3>
                            <h6> Likes: {post.likeCount}, Dislikes: {post.dislikeCount}, Comments: {post.commentList.length} </h6>
                            <div className="like-buttons">
                            </div>
                            <div className="comment-input">
                            </div>
                            <div className="post-buttons">
                            </div>
                            {CommentComponent(post, getAllPosts, props.userLoggedIn)}
                        </div>
                    )}
                </div>
            </div>
        )


    }

}