import React, { Component, useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AddPostPage } from './components/Post/AddPostPage';
import { HomeComponent } from './components/Home/HomePage';
import { NavBar } from './components/NavMenu/NavBar';
import { FooterBar } from './components/Footer/FooterBar';
import { RegistrationPage } from './components/Registration/RegistrationPage';
import { LoginPage } from './components/Login/LoginPage';

function App() {
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    useEffect(() => {
        if (sessionStorage.getItem("jwt")) setUserLoggedIn(true)
    })
    return (
        <div>
            <NavBar {...{ userLoggedIn, setUserLoggedIn }} />
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={<HomeComponent {...{ userLoggedIn, setUserLoggedIn }} />}
                        />
                
                        <Route
                            path="/add-post"
                            element={<AddPostPage />}
                        />
                        <Route
                            path="/redirect"
                            element={<Navigate to="/error-page" />}
                        />
                    <Route
                        path="/registration"
                        element={<RegistrationPage />}
                    />
                    <Route
                        path="/login"
                        element={<LoginPage {...{ userLoggedIn, setUserLoggedIn }} />}
                    />
                    </Routes>
                </BrowserRouter>
            <FooterBar></FooterBar> 
        </div>
    );
}

export default App;



