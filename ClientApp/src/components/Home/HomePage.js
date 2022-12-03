import React, { Component, useEffect, useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../src/custom.css'
import '../../../src/index.css'
import { CommentComponent } from '../Comment/CommentComponent';
import { SearchComponent } from '../Search/SearchComponent'
import { PostComponent } from '../Post/PostComponent'
import { baseUrl } from '../BaseUrl/BaseUrl';
import { } from '../Authentication/authenticationUtils';


export function HomeComponent(props) {

    const navigate = useNavigate();
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

    async function navigateToPost(id) {
        navigate(`/post/${id}`);
    }
  

    if (props.userLoggedIn == true) {
        return (
            <div className="page-content cursor_shape">
                <div className="title">
                    <h1>War Thunder Forum</h1>
                </div>
                <div className="add-post-block">
                    <a href="/add-post"><button className="add-post-btn" type="button">Add post</button></a>
                    {SearchComponent(getAllPosts)}
                </div>
                {PostComponent(posts, getAllPosts, searchedWord, navigateToPost, props.userLoggedIn)}
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
                            <div className="post-title">
                                <div><h2> {post.title}</h2></div>
                                <button className="go-to-post-btn" type="button" onClick={() => navigateToPost(post.id)}>Go to this post</button>
                            </div>
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