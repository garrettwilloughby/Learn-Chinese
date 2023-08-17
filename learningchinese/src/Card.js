import './App.css';
import React, { useState } from 'react'

const Card = () => {

const getFlashcards = () => {
    const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    return existingFlashcards;
}

const [flashcards, setFlashcards] = useState(getFlashcards());
const [cardIndex, setCurrentCardIndex] = useState(0);
const [flip, flipToggle] = useState(false);
const currentFlashcard = flashcards[cardIndex];

const index = () => {
    if(cardIndex == 0){
        setCurrentCardIndex(1);
    }
    else{
        setCurrentCardIndex(0);
    }
    return cardIndex
}


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
    algorithmLogic(4);
}

const okayTerm = () => {
    algorithmLogic(2);
}

const hardTerm = () => {
    algorithmLogic(1);
}  

const again = () => {
    algorithmLogic(0);
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


    //pop and push term so it doesnt get repeated. but do this after array is sorted.
    
    
    localStorage.setItem('flashcards', JSON.stringify(existingFlashcards));
    sortByInterval();
    decreaseIntervals();
    index();
    setFlashcards(getFlashcards());
};


//don't need to sort if we just append the flashcards to a queue anyway

const sortByInterval = () => {
    console.log('HI')
    const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    existingFlashcards.sort((a, b) => a.interval > b.interval ? 1 : -1)
    localStorage.setItem('flashcards', JSON.stringify(existingFlashcards));
    setFlashcards(existingFlashcards);
}



// const nextTerm = () => {
 
//     const nextIndex = (cardIndex + 1) % flashcards.length;
//     setCurrentCardIndex(nextIndex);
    
// } 

const decreaseIntervals = () => {
    const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

    existingFlashcards.map(flashcard => {
        if(flashcard.interval <= 1){
            flashcard.interval = 1;
        }
        else if(flashcard.interval >= 100){
            flashcard.interval /= 2;
        }

        else{
            flashcard.interval -= 0.05;
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
