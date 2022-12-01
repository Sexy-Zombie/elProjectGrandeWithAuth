import React from 'react';
import '../../../src/custom.css'
import '../../../src/index.css'
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