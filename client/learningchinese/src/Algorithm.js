import React, { useState } from "react";
import FlashcardList from "./Flashcardlist";
import { addFlashcard, deleteFlashcards } from "./util/api";
import Translate from './translate.png'
import translation from './util/translation'


function LocalStorage() {
    
    //input is the variable, set input is a function that sets the varaible. Default is empty.
    const [englishInput, setEnglishInput] = useState('');
    const [chineseInput, setChineseInput] = useState('');
    
    const addTerm = async () => {
        const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        const chineseInput = await translation(englishInput);
        setChineseInput(chineseInput.response);
        setEnglishInput(englishInput)
        // Create a new flashcard object with the user's inputs.
        // Default values for ease, repetition and interval is 2.5, 0 and 1 respectively.
        const newFlashcard = {
            chinese: chineseInput,
            translation: englishInput,
            pinyin: "Example Pinyin",
            ease: 2.5,
            repetition: 0,
            interval: 1
          };
    
        // Add the new flashcard to the existing flashcards array
        const updatedFlashcards = [...existingFlashcards, newFlashcard];
    
        // Save the updated flashcards array to local storage
        localStorage.setItem('flashcards', JSON.stringify(updatedFlashcards));
        addFlashcard(newFlashcard);
    
        // Clear the input fields after adding the flashcard
        setEnglishInput('');
        setChineseInput('');
        console.log("added card:", newFlashcard);
        window.location.reload();
      };

    const clearCards =  async () =>{

        if (window.confirm('Are you sure you want to delete all flashcards?')) {
        deleteFlashcards();
        localStorage.clear();
        window.location.reload();
            
    }
    }

    return (
    <div className = "input">

        
        <div className = "new">
            <input type="text" className = "term" autocomplete="off" id = "english" placeholder = "English Term" class = "english" value = {englishInput} onChange={(e) => setEnglishInput(e.target.value)}></input>
            <input type="text" className = "term" autocomplete="off" id = "chinese" placeholder = "Chinese Term" class = "chinese" value = {chineseInput} onChange={(e) => setChineseInput(e.target.value)}></input>

        <div className="editButtons">
            <div className = "add" onClick = {addTerm} >+</div>
            <div className = "delete" onClick={clearCards}>-</div>
            <div className="clear" onClick = {clearCards} >⃠</div>
            <div className="undo">⎌</div>
            <div className="translate" onClick={async () => {
                const translatedText = await translation(englishInput);
                setChineseInput(translatedText);  // Set the Chinese input with the translated text
            }}>Translate</div>
        </div>

        </div>

        <div className = 'flashcardlist'>
            <FlashcardList />
        </div>

    </div>

   

);
}

export default LocalStorage;