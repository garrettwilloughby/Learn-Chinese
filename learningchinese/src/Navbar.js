import './App.css';
import React from 'react';
import { Link } from "react-router-dom";

const nav = () => {
    return (  

    <header className='nav'>
        <h1 class = "title">學習中文!!</h1>
        <div>
        <Link to = "/">Flashcards</Link>
        <Link to = "/Local">Edit</Link>
        </div>
    </header>
);
}

export default nav