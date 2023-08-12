import React, { useState } from "react";
import Card from "./Card";
import FlashcardList from "./Flashcardlist";
const axios = require('axios');


const path = '/translate?api-version=3.0';
const params = '&to=zh-Hant'; // zh-Hant represents Traditional Chinese

/* This simple app uses the '/translate' resource to translate text from
one language to another. */

/* This template relies on the request module, a simplified and user friendly
way to make HTTP requests. */

var key_var = '4b37e2edcb214957b13a5e45fcbe1852';
const endpoint_var = 'https://api.cognitive.microsofttranslator.com/translate';
var region_var = 'api-nam.cognitive.microsofttranslator.com';


/* If you encounter any issues with the base_url or path, make sure that you are
using the latest endpoint: https://docs.microsoft.com/azure/cognitive-services/translator/reference/v3-0-translate */


function LocalStorage() {
    
    //input is the variable, set input is a function that sets the varaible. Default is empty.
    const [englishInput, setEnglishInput] = useState('');
    const [chineseInput, setChineseInput] = useState('');

    const addTerm = async () => {
        // Get existing flashcards from local storage (if any)
        const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        // Create a new flashcard object with the user's inputs.
        // Default values for ease, repetition and interval is 2.5, 0 and 1 respectively.
        const newFlashcard = {
          english: englishInput,
          chinese: chineseInput,
          ease: 2.5,
          repetition: 0,
          interval: 1
        };
    
        // Add the new flashcard to the existing flashcards array
        const updatedFlashcards = [...existingFlashcards, newFlashcard];
    
        // Save the updated flashcards array to local storage
        localStorage.setItem('flashcards', JSON.stringify(updatedFlashcards));
    
        // Clear the input fields after adding the flashcard
        setEnglishInput('');
        setChineseInput('');

        window.location.reload();

      };

    const clearCards = () =>{
        localStorage.clear();
        window.location.reload();
    }

    const undo = () => {
        const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        existingFlashcards.pop();
        localStorage.setItem('flashcards', JSON.stringify(existingFlashcards));
        window.location.reload();
    }

    const deleteCard = () =>{
        const existingFlashcards = JSON.parse(localStorage.getItem('flashcards')) || [];
        const selectedCard = {
            english: englishInput,
            chinese: chineseInput,
          };

    
        localStorage.removeItem('flashcards', existingFlashcards[selectedCard]);
        localStorage.setItem('flashcards', JSON.stringify(existingFlashcards));

        setEnglishInput('');
        setChineseInput('');
        window.location.reload();
    }
    


    return (
    <div className = "input">
        <div className = "new">
            <label for="term">English</label>
            <input type="text" autocomplete="off" id = "english" class = "english" value = {englishInput} onChange={(e) => setEnglishInput(e.target.value)}></input>
            <label for = "term">Chinese</label>
            <input type="text" autocomplete="off" id = "chinese" class = "chinese" value = {chineseInput} onChange={(e) => setChineseInput(e.target.value)}></input>
            <button onClick = {addTerm} >Add New Term</button>

            <div className="delete">
            <button onClick = {deleteCard} >Delete Term</button>
            </div>


            <div className="clear">
            <button onClick = {clearCards} >Clear Cards</button>
            </div>

            <div className="undo">
            <button onClick = {undo} >Undo</button>
            </div>
        </div>

        

        <div className = 'flashcardlist'>
            <FlashcardList />
        </div>

    </div>

   

);
};

export default LocalStorage;