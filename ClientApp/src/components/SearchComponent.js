import React from 'react';
import { baseUrl } from './BaseUrl';


export function SearchComponent(getAllPosts) {

    async function searchByWord() {
        let field = document.querySelector("#searchField");
        let searchWord = field.value;

        if (searchWord == "") {
            getAllPosts();
        }
        else {
            getAllPosts(searchWord);
        }
    }


    return (
        <div>
            <input id ="searchField" type="search" placeholder="Search" />
            <button type="button" onClick={() => searchByWord()}>Search</button>
        </div>
        );

}