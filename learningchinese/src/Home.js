import './App.css';
import React, { useState } from 'react'
import Flashcardlist from './Flashcardlist';
import LocalStorage from './Localstorage';
import Flashcard from './Flashcard';

const home= () => {

const [flashcards, setFlashcards] = useState(getCard());
const [cardIndex, setCurrentCardIndex] = useState(0);
  
const currentFlashcard = flashcards[cardIndex];
  
const nextTerm = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
}
  
    return (
 
 
<body>
    <div className= "container">  
    {flashcards.length > 0 ? (
    <div className = "flashcard"  key = {currentFlashcard.id}>
      <Flashcard flashcard = {currentFlashcard}/>
    </div> ) : (<p>No Flashcards.</p>

      )}        

    <button onClick = {nextTerm} >Next Term</button>
    
    </div>
</body>

);
}


const getCard = () => {
    const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    
    return existingFlashcards;
  }
  

export default home;