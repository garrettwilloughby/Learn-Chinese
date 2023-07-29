import React, { useState } from "react";

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
    


    return (
    <div className = "input">
        <div className = "new">
            <label for="term">English</label>
            <input type="text" id = "english" class = "english" value = {englishInput} onChange={(e) => setEnglishInput(e.target.value)}></input>
            <label for = "term">Chinese</label>
            <input type="text" id = "chinese" class = "chinese" value = {chineseInput} onChange={(e) => setChineseInput(e.target.value)}></input>
            <button onClick = {addTerm} >Add New Term</button>
        </div>

        <div className="clear">
        <button onClick = {clearCards} >Clear Cards</button>
        </div>
    </div>

   

);
};

export default LocalStorage;