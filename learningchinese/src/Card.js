import './App.css';
import React, { useState } from 'react'

const Card = () => {



const getDueCards = () => {
  const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
  const dueCards = existingFlashcards.filter(flashcard => flashcard.interval === 1);
  localStorage.setItem('duecards', JSON.stringify(dueCards));
  return dueCards;
};


const [flashcards, setFlashcards] = useState(getDueCards());
const [cardIndex, setCurrentCardIndex] = useState(0);
const [flip, flipToggle] = useState(false);
const currentFlashcard = flashcards[cardIndex];

  
const speakTerm = () => {
if(flashcards.length != 0){
    let utterance;
    if (flip) {
    utterance = new SpeechSynthesisUtterance(currentFlashcard.english);
    utterance.lang = "en";
    } else {
    utterance = new SpeechSynthesisUtterance(currentFlashcard.chinese);
    utterance.lang = "zh-CN";
}
    speechSynthesis.speak(utterance);
}
}



//Update card object, if know >= 3, place card in knownCards array. Known cards will be shown less frequently.
//dont try to add it as another object in local storage!

//how to access flashcard object??


const easyTerm = () => {
    const due = getDueCards();
    if(due.length > 0){
        algorithmLogic(5);
    }
    else{
        return;
    }
}

const okayTerm = () => {
    const due = getDueCards();
    if(due.length > 0){
        algorithmLogic(2);
    }
    else{
        return;
    }
}

const hardTerm = () => {
    const due = getDueCards();
    if(due.length > 0){
        algorithmLogic(1);
    }
    else{
        return;
    }
}  

const again = () => {
    const due = JSON.parse(localStorage.getItem('duecards')) || [];
    if(due.length > 0){
        algorithmLogic(0);
    }
    else{
        return;
    }
}  

const algorithmLogic = (q) => {
    const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

    if(q > 1){

        if (existingFlashcards[cardIndex].repetition == 0){
            existingFlashcards[cardIndex].interval = 1;
        }

        else if (existingFlashcards[cardIndex].repetition == 1){
            existingFlashcards[cardIndex].interval = 6;
        }
        
        else{
            existingFlashcards[cardIndex].interval = (existingFlashcards[cardIndex].interval * existingFlashcards[cardIndex].ease);
        }
        
        existingFlashcards[cardIndex].repetition += 1;
    }
    if(q <= 1){
        existingFlashcards[cardIndex].repetition = 0;
        existingFlashcards[cardIndex].interval = 1;
    }

    existingFlashcards[cardIndex].ease = existingFlashcards[cardIndex].ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
    if(existingFlashcards[cardIndex].ease < 1.3){
        existingFlashcards[cardIndex].ease = 1.3;
    }

    
    localStorage.setItem('flashcards', JSON.stringify(existingFlashcards));
    setFlashcards(getDueCards);
    nextTerm();
    
};


//don't need to sort if we just append the flashcards to a queue anyway

// const sortByInterval = () => {
//     const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
//     existingFlashcards.sort((a, b) => a.interval > b.interval ? 1 : -1)
//     localStorage.setItem('flashcards', JSON.stringify(existingFlashcards));
//     setFlashcards(existingFlashcards);
// }

const nextTerm = () => {
 
    const nextIndex = (cardIndex + 1) % flashcards.length;
    setCurrentCardIndex(nextIndex);
    
} 

const decreaseIntervals = () => {
    const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

    existingFlashcards.map(flashcard => {
        if(flashcard.interval <= 2){
            flashcard.interval = 1;
        }
        else{
        flashcard.interval -= 2;
        }
    })
    
    localStorage.setItem('flashcards', JSON.stringify(existingFlashcards));
    return existingFlashcards;
    }


//go through all flashcards. Push all due flashcards into dueCards array.
//if no cards @ interval 1, keep decreasing the interval of all cards.

return (

<div className= "container">  
    
    <div>
        {flashcards.length > 0 ? (
        <div  className = {`card ${flip ? 'flip' : ''}`} onClick = {() => flipToggle(!flip)} //*if flip true className = cardflip : false className = card (NEED TO BE BACKTICKS)
        >

            <div className= 'front'>
                {currentFlashcard.chinese}
            </div>

            <div className= 'back'>
                {currentFlashcard.english}
            </div>

        </div>
            
    ) : (<p>No Flashcards.</p>)}
    </div>

    <div className= {`flashcardButtons ${flip ? 'Front' : 'Back'}`}>
        <div className='button' onClick = {speakTerm}>speak</div>
        <div className='button'onClick = {nextTerm}>next</div>
        <div className='button'onClick = {easyTerm}>easy</div>
        <div className='button'onClick = {okayTerm}>okay</div>
        <div className='button'onClick = {hardTerm}>hard</div>
        <div className='button'onClick = {again}>again</div>
        <div className='button'onClick = {decreaseIntervals}>TEST</div>

    </div>

</div>

    );
};
 







export default Card;
