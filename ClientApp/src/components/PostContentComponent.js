import React from 'react';
import '../custom.css'
import '../index.css'
import { CommentComponent } from './CommentComponent';
import { baseUrl } from './BaseUrl';
import { apiPost } from './ApiPost';
import Highlighter from "react-highlight-words";

export function PostContentComponent(content, searchedWord) {

    let word = [searchedWord];
    
    return (
        <h3>
            <Highlighter
            highlightClassName="YourHighlightClass"
            searchWords={word}
            autoEscape={true}
            textToHighlight={content}
            />
        </h3>
    );
}