import React, { Component, useState, useEffect } from 'react';
import './NavMenu.css';
import '../index.css'

export function NavMenu(props) {
    function logout(e) {
        const token = localStorage.getItem("jwt");
        const nameHeader = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";
        const idHeader = "UserId";
        const tokenData = JSON.parse(atob(token.split('.')[1]));

        JSON.parse(atob(token.split('.')[1]))


        sessionStorage.removeItem("name")
        localStorage.removeItem("jwt");
        localStorage.removeItem("jwtExpiresAt");
        props.setUserLoggedIn(false)
        e.preventDefault()
    }
    function getUsername() {
        if (sessionStorage.getItem("name")) {
            return (
                <h5>Welcome, {sessionStorage.getItem("name")}</h5>
            )
        }
    }

    return (
        <>
            {!props.userLoggedIn ? (
                <header>
                    <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light border-bottom box-shadow mb-3 navmenu-line">
                        <div className="container-fluid">
                            <a className="navbar-brand" >WarThunderForum</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                                <ul className="navbar-nav flex-grow-1">
                                    <li className="nav-item">
                                        <a className="nav-link text-dark" href="/">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-dark" href="/privacy">Privacy</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-dark" href="/registration">Registrate</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-dark" href="/login">Login</a>
                                    </li>
                                </ul>
                                
                            </div>
                        </div>
                    </nav>
                </header>) : (
                <header>
                    <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light border-bottom box-shadow mb-3 navmenu-line">
                        <div className="container-fluid">
                            <a className="navbar-brand" >WarThunderForum</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                                <ul className="navbar-nav flex-grow-1">
                                    <li className="nav-item">
                                        <a className="nav-link text-dark" href="/">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-dark" href="/privacy">Privacy</a>
                                    </li>
                                        <li className="nav-item">
                                            <a className="nav-link text-dark logout-nav-button" href="/" onClick={logout}>Log out</a>
                                    </li>
                                </ul>
                                <div className="username-container">
                                    {getUsername()}
                                </div>
                            </div>
                        </div>
                    </nav>
                </header>)}
        </>

    );
}
































