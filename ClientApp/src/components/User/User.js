import React, { Component, useEffect, useState, useRef } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../../src/custom.css'
import '../../../src/index.css'
import { baseUrl } from '../BaseUrl/BaseUrl';


export function UserComponent() {
    const navigate = useNavigate();

    let { userId } = useParams();

    const [user, setUser] = useState();

    useEffect(() => {
        document.title = "User details";
        getUser();
    }, [])


    async function getUser() {
        const response = await fetch(`${baseUrl()}Account/getUser/${userId}`)
        let actualData = await response.json();
        setUser(actualData);
    }

    async function backToHome() {
        navigate('/');

    }

    

    if (user === undefined) {
        return (
            <div className="page-content cursor_shape">
                <div className="title">
                    <h1>Still loading...</h1>
                </div>
                
            </div>
        );
    }

    
    return (
        <div className="page-content cursor_shape">
            <div className="post-title">
                <h1>User details:</h1>
            </div>
            <div className="card post">
                <div>
                    <h2> Id: {user.id}</h2>
                    <h2> Username: {user.username}</h2>
                    <h2> email: {user.email}</h2>
                </div>
            </div>
            <button className="delete-post-btn" type="button" onClick={() => backToHome()}>Back to homepage</button>
        </div>
    );
        
}