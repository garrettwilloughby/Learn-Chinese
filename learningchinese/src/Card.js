import './App.css';
import React, { useState } from 'react'
import Flashcardlist from './Flashcardlist';
import LocalStorage from './Localstorage';
import Flashcard from './Flashcard';


const Card = () => {

const [flashcards, setFlashcards] = useState(getCard());
const [cardIndex, setCurrentCardIndex] = useState(0);
const [flip, flipToggle] = useState(false);
    
const nextTerm = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
} 

const speakTerm = () => {
    let utterance;
    if (flip) {
    utterance = new SpeechSynthesisUtterance(currentFlashcard.english);
    } else {
    utterance = new SpeechSynthesisUtterance(currentFlashcard.chinese);
}
    speechSynthesis.speak(utterance);
}
  
const currentFlashcard = flashcards[cardIndex];
  

  
return (

<div className= "container">  
    
    {flashcards.length > 0 ? (<div  
    className = {`card ${flip ? 'flip' : ''}`} //*if flip true className = cardflip : false className = card (NEED TO BE BACKTICKS)
    >

        <div className= 'front'>
            {currentFlashcard.chinese}
        </div>

        <div className= 'back'>
            {currentFlashcard.english}
        </div>
            
        <div className= 'flashcardButtons'>
            <div className = "button" onClick = {() => flipToggle(!flip)}>flip</div>
            <div className='button' onClick = {speakTerm}>speak</div>
            <div className='button'onClick = {nextTerm}>next</div>
        </div>

            

    </div>
    ) : (<p>No Flashcards.</p>)}
    </div>
    );
};
 





const getCard = () => {
    const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    
    return existingFlashcards;
  }
  

export default Card;
