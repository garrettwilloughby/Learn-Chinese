import React, { useState } from 'react'
import './App.css'

export default function Flashcard( {flashcard} ){

    const [flip, flipToggle] = useState(false);

    return (

        
        <div  
        className = {`card ${flip ? 'flip' : ''}`} //*if flip true className = cardflip : false className = card (NEED TO BE BACKTICKS)
        onClick = {() => flipToggle(!flip)}
        >

            <div className= 'front'>
                {flashcard.chinese}
            </div>

            <div className= 'back'>
                {flashcard.english}
            </div>

        </div>
    )
}

