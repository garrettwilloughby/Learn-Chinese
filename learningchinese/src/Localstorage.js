import React, { useState } from "react";
import Card from "./Card";

function LocalStorage() {
    //input is the variable, set input is a function that sets the varaible. Default is empty.
    const [englishInput, setEnglishInput] = useState('');
    const [chineseInput, setChineseInput] = useState('');

    const addTerm = () => {
        // Get existing flashcards from local storage (if any)
        const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
    
        // Create a new flashcard object with the user's inputs
        const newFlashcard = {
          english: englishInput,
          chinese: chineseInput,
        };
    
        // Add the new flashcard to the existing flashcards array
        const updatedFlashcards = [...existingFlashcards, newFlashcard];
    
        // Save the updated flashcards array to local storage
        localStorage.setItem('flashcards', JSON.stringify(updatedFlashcards));
    
        // Clear the input fields after adding the flashcard
        setEnglishInput('');
        setChineseInput('');
      };

    const clearCards = () =>{
        localStorage.clear();
    }

    const undo = () => {
        const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        existingFlashcards.pop();
        localStorage.setItem('flashcards', JSON.stringify(existingFlashcards));
    }

    const deleteCard = () =>{
        const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        const selectedCard = {
            english: englishInput,
            chinese: chineseInput,
          };

        delete existingFlashcards[selectedCard];
        localStorage.setItem('flashcards', JSON.stringify(existingFlashcards));

        setEnglishInput('');
        setChineseInput('');
    }
    


    return (
    <div className = "input">
        <div className = "new">
            <label for="term">English</label>
            <input type="text" id = "english" class = "english" value = {englishInput} onChange={(e) => setEnglishInput(e.target.value)}></input>
            <label for = "term">Chinese</label>
            <input type="text" id = "chinese" class = "chinese" value = {chineseInput} onChange={(e) => setChineseInput(e.target.value)}></input>
            <button onClick = {addTerm} >Add New Term</button>

            <div className="delete">
            <button onClick = {deleteCard} >Delete Term</button>
            </div>

        </div>

        <div className="clear">
        <button onClick = {clearCards} >Clear Cards</button>
        </div>

        <div className="undo">
        <button onClick = {undo} >Undo</button>
        </div>

        

    </div>

   

);
};

export default LocalStorage;