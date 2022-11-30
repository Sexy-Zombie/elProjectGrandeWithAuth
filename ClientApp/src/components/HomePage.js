import React, { Component, useEffect, useState, useRef } from 'react';
import '../custom.css'
import '../index.css'
import { CommentComponent } from './CommentComponent';
import { SearchComponent } from './SearchComponent'
import { PostComponent } from './PostComponent'
import { baseUrl } from './BaseUrl';
import { apiPost } from './ApiPost';
import Highlighter from "react-highlight-words";


export function HomeComponent() {

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
            {PostComponent(posts, getAllPosts, searchedWord)}
        </div>
    );
}