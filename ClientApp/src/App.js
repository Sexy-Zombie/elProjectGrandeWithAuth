import React, { Component, useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AddPostPage } from './components/AddPostPage';
import { HomeComponent } from './components/HomePage';
import { NavBar } from './components/NavBar';
import { FooterBar } from './components/FooterBar';
import { RegistrationPage } from './components/RegistrationPage';
import { LoginPage } from './components/LoginPage';

function App() {
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    useEffect(() => {
        if (sessionStorage.getItem("name")) setUserLoggedIn(true)
    })
    return (
        <div>
            <NavBar {...{ userLoggedIn, setUserLoggedIn }} />
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={<HomeComponent />}
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



