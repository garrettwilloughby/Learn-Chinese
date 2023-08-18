import './App.css';
import React from 'react';
import { Link } from "react-router-dom";

const nav = () => {
    return (  

    <header className='nav'>
        <h1 className = "title">學習中文!!</h1>

        <div>
        <Link className = 'navbutton' to = "/">Flashcards</Link>
        <Link className = 'navbutton' to = "/Local">Edit</Link>
        </div>
    </header>
);
}

export default nav